const { baseCompile } = require("@vue/compiler-core");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");

// 默认占位符
const defaultText = "--";
// 默认template编译参数
const defaultTemplateCompileOptions = {
  mode: "module",
  isTS: true,
};
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
      });
    },
    VariableDeclarator(nodePath) {
      const { type, async, params } = nodePath.node.init;
      // 获取vue组件所有的方法method定义
      if (type === "ArrowFunctionExpression") {
        const { name } = nodePath.node.id;
        // 执行回调，将值保存到componentInfo.methods中
        callback({
          type: "methods",
          key: name,
          content: {
            name,
            async,
            params,
            res: "",
            desc: nodePath?.parent?.leadingComments
              ?.map((i) => i.value?.trim())
              .join(","),
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
      const props = {
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
      // 执行回调，将值保存到componentInfo.props中，vue组件的props通过ts文件来定义
      callback({
        type: "props",
        key: props.name,
        content: props,
      });
    },
  });
};

module.exports = {
  traverserTemplateAst,
  compileTemplate,
  compileScript,
  compileTypeScript,
};
