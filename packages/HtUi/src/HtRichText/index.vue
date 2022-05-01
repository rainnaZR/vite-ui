<template>
  <div class="ht-rich-text">
    <div class="f-dn">
      <ht-upload
        ref="uploadRef"
        :data="{
          limit: 99,
          ...(data.uploadConfig || {}),
        }"
      />
    </div>

    <Toolbar
      class="toolbar"
      :style="data.toolbarStyle"
      :mode="data.mode"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      class="editor"
      v-model="valueHtml"
      style="height: 400px"
      :style="data.editorStyle"
      :mode="data.mode"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
// https://www.wangeditor.com/v5/menu-config.html
import {
  defineComponent,
  PropType,
  shallowRef,
  computed,
  ref,
  onBeforeUnmount,
  watch,
} from "vue";
import "@wangeditor/editor/dist/css/style.css";
import HtUpload from "../HtUpload";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { RichTextData } from "./types";

/**
 * 富文本组件，包括工具栏和编辑器两大块，可定制html内容。
 * */
export default defineComponent({
  name: "HtRichText",

  components: { HtUpload, Editor, Toolbar },

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
    const uploadRef = ref();
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    const toolbarConfig = computed(() => props.data.toolbarConfig);
    const editorConfig = computed(() => ({
      placeholder: "请输入内容...",
      MENU_CONF: {
        uploadImage: {
          // 自定义上传
          async customUpload(file: any, insertFn: any) {
            uploadRef.value?.onUploadFile(file).then((options: any) => {
              const { thumbSrc, src, name } = options?.file || {};
              insertFn(thumbSrc || src, name, src);
            });
          },
        },
      },
      ...(props.data.editorConfig || {}),
    }));
    const valueHtml = ref(props.modelValue);

    /**
     * 组件初始化
     * @params {Object} editor 编辑器实例
     * @returns void
     */
    const handleCreated = (editor: any) => {
      editorRef.value = editor;
    };

    /**
     * 组件销毁时，也及时销毁编辑器
     */
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
      () => valueHtml.value,
      (value) => {
        emit("update:modelValue", value);
      }
    );

    return {
      uploadRef,
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
