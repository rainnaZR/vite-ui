<template>
  <div class="ht-upload" :style="data.style">
    <input
      ref="inputFileRef"
      type="file"
      class="input"
      :multiple="data.multiple || false"
      :accept="data.accept || FILE_ACCEPT"
      @change="onChange"
    />

    <!-- 上传按钮插槽 -->
    <slot name="upload">
      <div v-if="data.uploadBtnText" class="btn f-mb10">
        <ht-button
          :data="{
            type: data.uploadBtnType,
            icon: data.uploadBtnIcon,
            content: data.uploadBtnText,
            size: data.uploadBtnSize,
          }"
          @click="onUpload"
        />
      </div>
      <div
        v-else
        class="item item-1 f-mr10 f-mb10 f-trans f-curp"
        @click="onUpload"
      >
        <ht-icon
          class="icon"
          :data="{
            name: 'u-icon-add',
            style: 'font-size: 44px;color: #99999980',
          }"
        />
      </div>
    </slot>

    <!-- 图片预览插槽 -->
    <slot name="preview">
      <div
        v-for="(img, index) in previewImg"
        :key="index"
        class="item item-2 f-mr10 f-mb10 f-curp"
      >
        <ht-image
          :data="{
            src: img.isImage
              ? img.thrumbSrc || `${img.src}?imageView2/1/w/200/h/200`
              : FILE_COVER,
          }"
          @on-click="onPreviewImg(img)"
        />
        <div class="tools f-trans">
          <ht-icon
            :data="{ name: 'u-icon-delete' }"
            @on-click="onDeleteImg(img, index)"
          />
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive } from "vue";
import { request } from "@htfed/utils";
import { UploadData } from "./types";

request.init();

/**
 * 文件上传组件。
 * */
export default defineComponent({
  name: "HtUpload",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<UploadData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const inputFileRef = ref(null);
    const SIZE_UNITS = {
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
    };
    const IMAGE_DOMAIN = "https://image.dahuangf.com";
    const FILE_COVER =
      "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b295ba4df889443b81b8434d046a39e5~tplv-k3u1fbpfcp-watermark.image";
    const FILE_ACCEPT = "image/*,application/pdf,*/mp4";
    const loading = ref(false);
    const onGetExtension = (path) => {
      const extension = path
        ?.substring(path.lastIndexOf(".") + 1)
        ?.toLowerCase();
      return {
        extension,
        isImage: ["png", "jpg", "jpeg", "bmp", "webp"].includes(extension),
      };
    };
    const onGetPreviewImg = () => {
      const imgs = Array.isArray(props.data.previewImg)
        ? props.data.previewImg
        : [props.data.previewImg];
      return imgs
        ?.filter((img) => !!img)
        ?.map((img) => {
          if (typeof img === "string") {
            return {
              src: img,
              ...(onGetExtension(img) || {}),
            };
          }
          return {
            ...img,
            ...(onGetExtension(img.src) || {}),
          };
        });
    };
    const previewImg = reactive(onGetPreviewImg());

    // 检查文件后缀名
    const onCheckExtensions = (file, extensions) => {
      return new Promise((resolve, reject) => {
        const result = onGetExtension(file.name);
        if (!extensions) return resolve(result);
        if (extensions.indexOf(result.extension) > -1) return resolve(result);
        const params = {
          name: "ExtensionError",
          message: `只能上传${extensions}类型的文件！`,
          data: result,
        };
        return reject(params);
      });
    };
    // 检查文件大小
    const onCheckSize = (file, maxSize, options) => {
      return new Promise((resolve, reject) => {
        const result = {
          ...options,
          size: file.size,
        };
        if (!maxSize) return resolve(result);
        if (!isNaN(maxSize)) {
          maxSize = +maxSize;
        } else {
          // 按照单位换算
          const unit = maxSize.slice(-2);
          if (!SIZE_UNITS[unit]) {
            const params = {
              name: "SizeUnitError",
              message: "尺寸单位不支持！",
              data: {
                unknownUnit: unit,
                units: Object.keys(SIZE_UNITS),
              },
            };
            return reject(params);
          }
          maxSize = maxSize.slice(0, -2) * SIZE_UNITS[unit];
        }
        if (file.size <= maxSize) return resolve(result);
        const params = {
          name: "SizeError",
          message: "文件大小超出限制！",
          data: {
            maxSize,
            size: file.size,
          },
        };
        return reject(params);
      });
    };
    // 检查文件的尺寸
    const onCheckDimension = (file, width, height, options) => {
      return new Promise((resolve, reject) => {
        // 如果是图片，则校验尺寸，否则不校验
        if (!options.isImage) return resolve(options);
        // 读取图片数据
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          // 加载图片获取图片真实宽度和高度
          const image = new Image();
          image.onload = () => {
            const imgWidth = image.width;
            const imgHeight = image.height;
            const result = {
              ...options,
              width,
              height,
              imgWidth,
              imgHeight,
            };

            // 如果没设置宽高
            if (!width && !height) return resolve(result);
            // 如果设置了宽高
            if (width && height) {
              if (width && width === imgWidth && height && height === imgHeight)
                return resolve(result);

              const params = {
                name: "DimensionError",
                message: "图片没有按照指定宽度和高度上传！",
                data: result,
              };
              return reject(params);
            }
            if (width) {
              // 如果设置了图片宽度，且上传图片的宽度等于设置宽度时
              if (width && width === imgWidth) return resolve(result);

              const params = {
                name: "DimensionWidthError",
                message: "图片没有按照指定宽度上传！",
                data: result,
              };
              return reject(params);
            }
            if (height) {
              // 如果设置了图片高度，且上传图片的高度等于设置高度时
              if (height && height === imgHeight) return resolve(result);

              const params = {
                name: "DimensionHeightError",
                message: "图片没有按照指定高度上传！",
                data: result,
              };
              return reject(params);
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(file);
      });
    };
    const onUploadFile = (file, options) => {
      return request
        .get("https://production.api.dahuangf.com/api/base/getQiNiuToken")
        .then((res) => {
          const { token, key } = res.data.data;
          const { extension } = options;

          const formData = new FormData();
          formData.append("token", token);
          formData.append("file", file);
          formData.append("key", `${key}.${extension}`);
          return request
            .post("https://upload.qiniup.com/", formData)
            .then(async (result) => {
              loading.value = false;
              inputFileRef.value.value = "";
              const src = `${IMAGE_DOMAIN}/${result.data.key}.${extension}`;
              const { imgWidth, imgHeight } = options;
              const imgData = {
                ...options,
                src,
                thrumbSrc: `${src}?imageView2/1/w/${Math.round(
                  (imgWidth / imgHeight) * 200
                )}/h/200`,
              };
              previewImg.push(imgData);
              emit("on-success", imgData);
            });
        });
    };

    const onCheckFile = (file) => {
      // 校验文件是否有名字
      if (!file || !file.name) return;
      const { extensions, maxSize, width, height } = props.data;
      onCheckExtensions(file, extensions)
        .then((options) => onCheckSize(file, maxSize, options))
        .then((options) => onCheckDimension(file, width, height, options))
        .then((options) => onUploadFile(file, options))
        .catch((err) => {
          loading.value = false;
          inputFileRef.value.value = "";
          console.error(err);
          emit("on-error", err);
        });
    };
    const onChange = () => {
      const files = inputFileRef.value.files || [
        {
          name: inputFileRef.value.value,
          size: 0,
        },
      ];
      for (let i = 0; i < files.length; i++) {
        onCheckFile(files[i]);
      }
    };
    const onUpload = () => {
      inputFileRef.value?.click();
    };
    const onPreviewImg = (item) => {
      item.src && window.open(item.src);
    };
    const onDeleteImg = () => {};

    return {
      inputFileRef,
      SIZE_UNITS,
      FILE_COVER,
      FILE_ACCEPT,
      previewImg,
      onChange,
      onUpload,
      onPreviewImg,
      onDeleteImg,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
