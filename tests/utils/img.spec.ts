import { mount } from "@vue/test-utils";
import MeImg from "~/MeImg/index.vue";

describe("MeImg", () => {
  const src = "http://dummyimage.com/100x100/0079cb/fff"; // 图片地址
  test("props src", () => {
    // 向组件里传参
    const wrapper = mount(MeImg, {
      props: { src },
    });
    const viewer = wrapper.find(".me-img"); // 获取 DOM
    expect(viewer.exists()).toBeTruthy();
    const imgEl = viewer.find("img");
    expect(viewer.exists()).toBeTruthy();
    expect(imgEl.attributes("src")).toBe(src);
  });
});
