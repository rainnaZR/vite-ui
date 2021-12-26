import type { App } from "vue";
import HtImg from "./index.vue";
type SFCWithInstall<T> = T & { install(app: App): void }

// 安装
HtImg.install = (app: App) => {
  app.component(HtImg.name, HtImg);
};
const Component: SFCWithInstall<typeof HtImg> = HtImg;
export default Component;
