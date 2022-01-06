import { Options } from "@vitejs/plugin-vue";
import { vueDocFiles as include } from "vite-plugin-vuedoc";
import { VueDocPluginOptions } from "vite-plugin-vuedoc/dist/plugin";
import MarkdownItContainer from "markdown-it-container";

// vite插件配置
const vitePluginVuedocConfig: Partial<VueDocPluginOptions> = {
  wrapperClass: "m-markdown-default",
  highlight: {
    theme: "one-light", // one-dark|one-light
  },
  markdownIt: {
    plugins: [
      [
        MarkdownItContainer,
        "CopyCode",
        {
          validate: (params) => params.trim().match(/^CopyCode\s*(.*)$/),
          render: (tokens, idx) => (tokens[idx].nesting === 1 ? `<ht-copy>` : `</ht-copy>\n`)
        }
      ]
    ]
  }
};

// vue插件配置
const vueConfig: Options = {
  include,
};

export { vitePluginVuedocConfig, vueConfig };
