import type { App } from "vue";
import "vxe-table/lib/style.css";
import VXETable from "vxe-table";
import component from "./index.vue";
import { SFCWithInstall } from "../types";

// 安装
component.install = (app: App) => {
  app.component(component.name, component);
  app.use(VXETable);
};

const Component: SFCWithInstall<typeof component> = component;
export default Component;
