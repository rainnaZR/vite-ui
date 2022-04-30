<template>
  <div class="ht-rich-text">
    <Toolbar
      class="toolbar"
      :style="data.toolbarStyle"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="data.mode || 'default'"
    />
    <Editor
      class="editor"
      v-model="valueHtml"
      style="height: 500px"
      :style="data.editorStyle"
      :defaultConfig="editorConfig"
      :mode="data.mode || 'default'"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  shallowRef,
  ref,
  onBeforeUnmount,
  watch,
} from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { RichTextData } from "./types";

/**
 * 富文本组件。
 * */
export default defineComponent({
  name: "HtRichText",

  components: { Editor, Toolbar },

  props: {
    // 编辑器显示值
    modelValue: {
      type: [String, Number],
      required: true,
      default: "",
    },
    // 配置数据
    data: {
      type: Object as PropType<RichTextData>,
      required: true,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    const toolbarConfig = {};
    const editorConfig = {
      placeholder: props.data.placeholder || "请输入内容...",
    };
    const valueHtml = ref(props.modelValue);

    const handleCreated = (editor: any) => {
      editorRef.value = editor;
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    watch(
      () => props.modelValue,
      (value) => {
        valueHtml.value = value;
      }
    );
    watch(
      () => valueHtml,
      (value) => {
        emit("update:modelValue", value);
      }
    );

    return {
      editorRef,
      toolbarConfig,
      editorConfig,
      valueHtml,
      handleCreated,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
