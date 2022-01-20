// 构建成Markdown
class RenderMd {
  constructor(parserResult, options = {}) {
    const defaultOptions = {
      props: {
        name: "属性",
        desc: "说明",
        type: "类型",
        default: "默认值",
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
            mdArr.push(...this.renderTitle(content, false, 2));
            break;
          case "desc":
            mdArr.push(content);
            break;
          case "props":
          case "slots":
          case "events":
          case "methods":
            if (this.options[key]) {
              mdArr.push(...this[`${key}Render`](content, this.options[key]));
            }
            break;
          default:
            break;
        }
      }
    });
    return mdArr.join("\n");
  }

  renderTitle(title, br = true, num = 3) {
    const h = ["#", "##", "###", "####", "#####", "######"];
    return br ? ["", "", `${h[num - 1]} ${title}`] : [`${h[num - 1]} ${title}`];
  }

  propsRender(content, config) {
    const kt = this._getKeysAndTitles(config, [
      "name",
      "desc",
      "type",
      "default",
    ]);
    const mdArr = [
      ...this.renderTitle("Props"),
      ...this.renderTabelHeader(kt.titles),
    ];
    for (const key in content) {
      if (Object.hasOwnProperty.call(content, key)) {
        const element = content[key];
        const row = [];
        kt.keys.map((key) => {
          if (Object.keys(element).includes(key)) {
            if (key === "name") {
              row.push(
                `${element[key]}${this._tag(element, "sync")}${this._tag(
                  element,
                  "model"
                )}`
              );
            } else {
              row.push(element[key]);
            }
          } else {
            row.push("--");
          }
        });
        mdArr.push(this.renderTabelRow(row));
      }
    }
    return mdArr;
  }

  slotsRender(slotsRes, config) {
    const kt = this._getKeysAndTitles(config, ["name", "desc"]);
    const mdArr = [
      ...this.renderTitle("Slots"),
      ...this.renderTabelHeader(kt.titles),
    ];
    for (const key in slotsRes) {
      if (Object.hasOwnProperty.call(slotsRes, key)) {
        const element = slotsRes[key];
        const row = [];
        kt.keys.map((key) => {
          if (Object.keys(element).includes(key)) {
            row.push(element[key]);
          } else {
            row.push("--");
          }
        });
        mdArr.push(this.renderTabelRow(row));
      }
    }
    return mdArr;
  }

  eventsRender(eventRes, config) {
    const kt = this._getKeysAndTitles(config, ["name", "desc"]);
    const mdArr = [
      ...this.renderTitle("Events"),
      ...this.renderTabelHeader(kt.titles),
    ];
    for (const key in eventRes) {
      if (Object.hasOwnProperty.call(eventRes, key)) {
        const element = eventRes[key];
        const row = [];
        kt.keys.map((key) => {
          if (Object.keys(element).includes(key)) {
            row.push(element[key]);
          } else {
            row.push("--");
          }
        });
        mdArr.push(this.renderTabelRow(row));
      }
    }
    return mdArr;
  }

  methodsRender(methodRes, config) {
    const kt = this._getKeysAndTitles(config, [
      "name",
      "desc",
      "params",
      "res",
    ]);
    const mdArr = [
      ...this.renderTitle("Methods"),
      ...this.renderTabelHeader(kt.titles),
    ];
    for (const key in methodRes) {
      if (Object.hasOwnProperty.call(methodRes, key)) {
        const element = methodRes[key];
        const row = [];
        kt.keys.map((key) => {
          if (Object.keys(element).includes(key)) {
            if (key === "name") {
              row.push(`${element[key]}${this._tag(element, "async")}`);
            } else if (key === "params") {
              row.push(this._funParam(element[key]));
            } else {
              row.push(element[key]);
            }
          } else {
            row.push("--");
          }
        });
        mdArr.push(this.renderTabelRow(row));
      }
    }
    return mdArr;
  }

  renderTabelHeader(header) {
    return [
      this.renderTabelRow(header),
      `|${header.map(() => "------").join("|")}|`,
    ];
  }

  renderTabelRow(row) {
    return `|${row.join("|")}|`;
  }

  _getKeysAndTitles(config, inKeys) {
    const keys = Object.keys(config).filter((key) => inKeys.includes(key));
    const titles = keys.map((key) => config[key]);
    return { keys, titles };
  }

  _funParam(params) {
    if (!params) return "—";
    return params
      .map(
        (item) =>
          `${item.name}:${item.type}${item.desc ? `(${item.desc})` : ""}`
      )
      .join(",");
  }
  
  _tag(item, tag) {
    return item[tag] ? ` \`${tag}\` ` : "";
  }
}

module.exports = {
  RenderMd,
};
