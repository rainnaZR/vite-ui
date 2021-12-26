import { mount } from "@vue/test-utils";
import HtImg from "~/HtImg/index.vue";

describe("HtImg", () => {
  const src =
    "https://pics1.baidu.com/feed/d50735fae6cd7b8906d8447d5041e0aed8330e02.jpeg?token=b798fd3f957e4c33967d87d9ec2b16b5"; // 图片地址
  test("props src", () => {
    // 向组件里传参
    const wrapper = mount(HtImg, {
      props: { src },
    });
    const viewer = wrapper.find(".ht-img");
    expect(viewer.exists()).toBeTruthy();
    const imgEl = viewer.find("img");
    expect(viewer.exists()).toBeTruthy();
    expect(imgEl.attributes("src")).toBe(src);
  });
});
