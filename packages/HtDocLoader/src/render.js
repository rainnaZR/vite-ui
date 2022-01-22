// 构建成Markdown
class RenderMd {
  constructor(parserResult, options = {}) {
    const defaultOptions = {
      props: {
        name: "属性",
        desc: "说明",
        type: "类型",
        required: "是否必填项",
        optional: "可选值",
        default: "默认值",
        tsPropType: "tsPropType",
        scope: "scope",
      },
      slots: {
        name: "插槽",
        desc: "说明",
      },
      events: {
        name: "事件名",
        desc: "说明",
      },
      methods: {
        name: "方法名",
        desc: "说明",
        params: "参数",
        res: "返回值",
      },
    };
    this.parserResult = parserResult;
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  render() {
    const mdArr = [];
    Object.keys(this.parserResult).forEach((key) => {
      const content = this.parserResult[key];
      if (content) {
        switch (key) {
          case "name":
            mdArr.push(
              ...this.onRenderTitle({
                content,
                isNewLine: false,
                weight: 2,
              })
            );
            break;
          case "desc":
            mdArr.push(content);
            break;
          case "props":
            if (this.options[key]) {
              // props数据
              mdArr.push(
                ...this.onRenderContent({
                  key,
                  content,
                  option: this.options[key],
                })
              );
              // tsProps数据
              mdArr.push(
                ...this.onRenderContent({
                  key: "tsProps",
                  content: this.onFilterTsProps(
                    content,
                    this.parserResult.tsProps
                  ),
                  option: this.options.props, // 公用props的配置数据
                })
              );
            }
            break;
          case "slots":
          case "events":
          case "methods":
            this.options[key] &&
              mdArr.push(
                ...this.onRenderContent({
                  key,
                  content,
                  option: this.options[key],
                })
              );
            break;
          default:
            break;
        }
      }
    });
    return mdArr.join("\n");
  }

  // 过滤tsProps，只展示在组件props中data相关的属性信息，ts文件中定义的其他数据字段不展示
  onFilterTsProps(props, tsProps) {
    const tsPropTypes = Object.values(props)
      ?.map((i) => i.tsPropType)
      ?.filter((i) => !!i);
    Object.values(tsProps)?.forEach((i) => {
      if (!tsPropTypes.includes(i.scope)) delete tsProps[i.name];
    });
    return tsProps;
  }

  onRenderTitle({ content, isNewLine = true, weight = 3 }) {
    const weights = ["#", "##", "###", "####", "#####", "######"];
    return isNewLine
      ? ["", "", `${weights[weight - 1]} ${content}`]
      : [`${weights[weight - 1]} ${content}`];
  }

  onRenderContent({ key, content, option }) {
    const mdArr = [
      ...this.onRenderTitle({
        content: `${key?.slice(0, 1).toUpperCase()}${key?.slice(1)}`,
      }),
      ...this.onRenderTableHeader(Object.values(option)),
    ];

    Object.keys(content).forEach((contentKey) => {
      const element = content[contentKey];
      const row = [];
      Object.keys(option).forEach((optionKey) => {
        if (key === "methods" && optionKey === "name") {
          row.push(`${element[optionKey]}${this.onGetTag(element, "async")}`);
        } else if (key === "methods" && optionKey === "params") {
          row.push(this.onGetParam(element[optionKey]) || "--");
        } else if (key === "props" && optionKey === "required") {
          row.push(element[optionKey] ? "是" : "否");
        } else {
          row.push(element[optionKey] || "--");
        }
      });
      mdArr.push(this.onRenderTableRow(row));
    });
    return mdArr;
  }

  onRenderTableHeader(header) {
    return [
      this.onRenderTableRow(header),
      `|${header.map(() => "------").join("|")}|`,
    ];
  }

  onRenderTableRow(row) {
    return `|${row.join("|")}|`;
  }

  onGetTag(item, tag) {
    return item[tag] ? ` \`${tag}\` ` : "";
  }

  onGetParam(params) {
    if (!params) return "—";
    return params
      .map(
        (item) =>
          `${item.name}:${item.type}${item.desc ? `(${item.desc})` : ""}`
      )
      .join(",");
  }
}

module.exports = {
  RenderMd,
};
