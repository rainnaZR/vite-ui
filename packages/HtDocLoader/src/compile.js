const { baseCompile } = require("@vue/compiler-core");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const generate = require("@babel/generator");

// 默认占位符
const defaultText = "--";
// 默认script编译参数
const defaultScriptCompileOptions = {
  plugins: [
    "jsx",
    "typescript",
    // "asyncGenerators",
    // "bigInt",
    "classProperties",
    "classPrivateProperties",
    "classPrivateMethods",
    // ["decorators", { decoratorsBeforeExport: false }],
    "decorators-legacy",
    // "doExpressions",
    "dynamicImport",
    "exportDefaultFrom",
    // "exportNamespaceFrom",
    // "functionBind",
    // "functionSent",
    // "importMeta",
    // "logicalAssignment",
    // "nullishCoalescingOperator",
    // "numericSeparator",
    // "objectRestSpread",
    // "optionalCatchBinding",
    // "optionalChaining",
    // ["pipelineOperator", { proposal: "minimal" }],
    // "throwExpressions",
    // "topLevelAwait",
    // "estree",
  ],
  allowImportExportEverywhere: true,
  sourceType: "module",
};
// 默认typescript编译参数
const defaultTypeScriptCompileOptions = {
  plugins: [
    "jsx",
    "typescript",
    "asyncGenerators",
    "bigInt",
    "classProperties",
    "classPrivateProperties",
    "classPrivateMethods",
    ["decorators", { decoratorsBeforeExport: false }],
    // "decorators-legacy",
    "doExpressions",
    "dynamicImport",
    "exportDefaultFrom",
    "exportNamespaceFrom",
    "functionBind",
    "functionSent",
    "importMeta",
    "logicalAssignment",
    "nullishCoalescingOperator",
    "numericSeparator",
    "objectRestSpread",
    "optionalCatchBinding",
    "optionalChaining",
    ["pipelineOperator", { proposal: "minimal" }],
    "throwExpressions",
    "topLevelAwait",
    "estree",
  ],
  allowImportExportEverywhere: true,
  sourceType: "module",
};
// 默认template编译参数
const defaultTemplateCompileOptions = {
  mode: "module",
  isTS: true,
};

// script内容编译
const compileScript = (scriptStr, options = {}, callback = () => {}) => {
  if (!scriptStr) return;
  // 编译scriptStr生成scriptAst
  const scriptAst = parser.parse(scriptStr, {
    ...defaultScriptCompileOptions,
    ...options,
  });
  // 遍历scriptAst
  traverse.default(scriptAst, {
    // 获取方法标签 func()
    CallExpression(nodePath) {
      const currNode = nodePath.node;
      const funcName = currNode.callee.name;
      // 提取所有的emit方法
      if (funcName === "emit") {
        // emit('on-click', params, params) 第一个参数'on-click'为emit的方法名emitName，后面是参数列表emitParams
        const emitName = currNode.arguments[0].value;
        const emitParams = currNode.arguments
          .slice(1)
          .map((i, index) => `param${index + 1}`)
          .join("|");
        // 执行回调，将值保存到componentInfo.events中
        callback({
          type: "events",
          key: emitName,
          content: {
            name: emitName,
            desc:
              nodePath.parent?.leadingComments
                ?.map((i) => i.value.trim())
                ?.join(",")
                ?.toString() || "——",
            params: emitParams,
          },
        });
      }
    },
    ExportDefaultDeclaration(nodePath) {
      // 获取组件的注释描述信息 export default {}前面的注释
      const content = nodePath?.node?.leadingComments
        ?.map((item) => {
          if (item.type === "CommentLine") {
            return item.value.trim();
          }
          return item.value
            .split("\n")
            .map((i) => i.replace(/[\s*]/g, ""))
            .filter(Boolean);
        })
        .toString();
      // 执行回调，将值保存到componentInfo.desc中
      callback({
        type: "desc",
        content,
      });

      const argument = nodePath.node.declaration.arguments[0];
      // 获取vue组件的options参数属性：name, props, setup等
      const { properties } = argument;
      properties.forEach((prop) => {
        // 此时所有prop.type == 'ObjectProperty'
        const key = prop.key.name;
        // 获取组件注册的name名称
        if (key === "name") {
          // 执行回调，将值保存到componentInfo.name中
          callback({
            type: key,
            content: prop.value?.value,
          });
        }
        // 获取组件props定义
        if (key === "props") {
          prop.value.properties?.forEach((propNode) => {
            const {
              key: propNodeKey,
              value: propNodeValue,
              leadingComments,
            } = propNode;
            const result = {
              type: key,
              key: propNodeKey.name,
              content: {
                name: propNodeKey.name,
                desc: leadingComments && leadingComments[0]?.value?.trim(),
                type: "",
                tsPropType: "", // 对应ts文件里props.data里的属性描述名字，比如ButtonData, TabData等
                required: false,
                optional: "",
                default: "",
              },
            };
            // 根据prop的不同类型展示不同的值
            // 基础的类型检查 propA: Number
            if (propNodeValue.type === "Identifier") {
              result.content.type = propNodeValue.name;
            }
            // 对象或数组的类型检查
            // propB: {
            //   type: Object as PropType<ButtonData>,
            //   required: true,
            //   default: () => ({
            //     type: "default",
            //     size: "normal",
            //   }),
            // },
            if (propNodeValue.type === "ObjectExpression") {
              propNodeValue.properties.forEach((i) => {
                const keyName = i.key.name;
                if (keyName === "type") {
                  result.content[keyName] =
                    i.value.name || i.value.expression?.name || "Object";
                  result.content.tsPropType =
                    i.value.typeAnnotation?.typeParameters?.params[0]?.typeName?.name;
                }
                if (keyName === "required") {
                  result.content[keyName] = i.value?.value;
                }
                if (keyName === "default") {
                  try {
                    const targetProp = propNodeValue.properties.filter(
                      (item) => item.key.name === "default"
                    );
                    if (targetProp) {
                      const targetBody = targetProp[0].value.body;
                      const { code } = generate.default(targetBody);
                      result.content[keyName] = JSON.stringify(code);
                    }
                  } catch (error) {}
                }
              });
            }
            // propC: [String, Number],
            if (propNodeValue.type === "ArrayExpression") {
              result.content.type = propNodeValue.elements
                ?.map((item) => item.name)
                .join(", ");
            }
            callback(result);
          });
        }
      });
    },
    VariableDeclarator(nodePath) {
      const { type, async, params: defaultParams } = nodePath.node.init;
      // 获取vue组件所有的方法method定义
      if (type === "ArrowFunctionExpression") {
        const { name } = nodePath.node.id;
        const leadingComments = nodePath?.parent?.leadingComments;
        let desc;
        let res;
        const params = [];
        if (leadingComments) {
          const comment = leadingComments[leadingComments.length - 1];
          if (comment.type === "CommentLine") {
            desc = comment.value.trim();
          } else {
            // 提取方法说明
            const descRes = comment.value.match(/\*\s*[^@]\s*(.*)/);
            if (descRes) {
              desc = descRes[1];
            }
            // 提取 参数说明
            const paramsRes = comment.value.matchAll(
              /(@param)[\s]*{([a-zA-Z]*)}[\s]*(\w*)(.*)/g
            );
            // eslint-disable-next-line no-restricted-syntax
            for (const param of paramsRes) {
              params.push({
                name: param[3],
                type: param[2],
                desc: param[4].trim(),
              });
            }
            // 提取方法返回值
            const returnRes = comment.value.match(/(@returns)[\s]*(.*)/);
            if (returnRes) {
              res = returnRes[2];
            }
          }
        }
        // 执行回调，将值保存到componentInfo.methods中
        callback({
          type: "methods",
          key: name,
          content: {
            name,
            async,
            params: params || defaultParams,
            res,
            desc,
          },
        });
      }
    },
  });
};

// ts类型文件内容编译
const compileTypeScript = (
  typeScriptStr,
  options = {},
  callback = () => {}
) => {
  if (!typeScriptStr) return;
  // 编译typeScriptStr生成tsAst
  const tsAst = parser.parse(typeScriptStr, {
    ...defaultTypeScriptCompileOptions,
    ...options,
  });
  // 遍历ast
  traverse.default(tsAst, {
    TSPropertySignature(nodePath) {
      // 获取 interface 接口定义值
      const tsProp = {
        scopeType: nodePath.parentPath?.container?.type,
        scope: nodePath.parentPath?.container?.id?.name,
        name: nodePath.node?.key?.name,
        required: !!nodePath.node?.optional,
        type:
          nodePath.node?.typeAnnotation?.typeAnnotation?.type === "TSUnionType"
            ? nodePath.node?.typeAnnotation?.typeAnnotation?.types
                ?.map((i) => i.type)
                ?.join(",")
            : nodePath.node?.typeAnnotation?.typeAnnotation?.type,
        desc: nodePath.node.trailingComments
          ?.map((i) => i.value?.trim())
          .join(","),
      };
      tsProp.type = tsProp.type?.replace(/TS(\w+)Keyword/g, (str, $1) => $1);
      // 执行回调，将值保存到componentInfo.tsProps中，vue组件的props里的data属性通过ts文件来定义
      callback({
        type: "tsProps",
        key: tsProp.name,
        content: tsProp,
      });
    },
  });
};

// 遍历模板AST
const traverserTemplateAst = (ast, visitor = {}) => {
  function traverseNode(node, parent) {
    visitor.enter && visitor.enter(node, parent);
    visitor[node.tag] && visitor[node.tag](node, parent);
    node.children && traverseArray(node.children, node);
    visitor.exit && visitor.exit(node, parent);
  }

  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }
  traverseNode(ast, null);
};

// template模板内容编译
const compileTemplate = (templateStr, options = {}, callback = () => {}) => {
  if (!templateStr) return;
  const { ast } = baseCompile(templateStr, {
    ...defaultTemplateCompileOptions,
    ...options,
  });
  // 遍历模板ast
  traverserTemplateAst(ast, {
    // 插槽标签
    slot(node, parent) {
      // 提取所有的插槽slot
      const index = parent.children.findIndex((item) => item === node);
      let desc = defaultText;
      let name = defaultText;
      if (index > 0) {
        // 查询是否有插槽的注释标签
        // @vue/compiler-core 里的parseComment方法，type: 3 /* COMMENT */
        const tag = parent.children[index - 1];
        if (tag.type === 3) {
          desc = tag.content.trim();
        }
      }
      // 获取插槽name名称 <slot name="header"></slot> 获取值"header"
      if (node.props && node.props.length) {
        const targetProp = node.props.filter(
          (prop) => prop.type === 6 && prop.name === "name"
        )[0];
        targetProp && (name = targetProp.value.content);
      }
      // 执行回调，将值保存到componentInfo.slots中
      callback({
        type: "slots",
        key: name,
        content: {
          name,
          desc,
        },
      });
    },
  });
};

module.exports = {
  traverserTemplateAst,
  compileScript,
  compileTypeScript,
  compileTemplate,
};
