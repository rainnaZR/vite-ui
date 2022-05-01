<template>
  <div v-loading="loading" class="ht-upload" :style="data.style">
    <!-- 详情模式 -->
    <template v-if="data.showType == 'detail'">
      <div v-if="files && files.length" class="list">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="item f-mr10 f-mb10"
          @click="onPreview(file, index)"
        >
          <div class="content content-2 f-curp">
            <!-- 文件区域 -->
            <ht-image
              :data="{
                src: file.isImage ? file.thumbSrc || file.src : FILE_COVER,
              }"
            />
            <!-- 文件标签 -->
            <ht-tag v-if="!file.isImage" class="tag">
              {{ file.extension }}
            </ht-tag>
            <!-- 文件操作 -->
            <div v-if="!data.hideOperation" class="tools f-df f-jcc f-trans">
              <!-- 下载 -->
              <ht-icon
                class="f-ml5 f-mr5"
                :data="{ name: 'u-icon-download' }"
                @on-click.stop="onDownload(file, index)"
              />
            </div>
          </div>
          <!-- 文件名称 -->
          <div v-if="!data.hideFileName" class="fileName s-fc5 f-tac f-txtell">
            {{ file.name }}
          </div>
        </div>
      </div>
      <div v-else>{{ data.placeholderText }}</div>
    </template>
    <!-- 编辑模式 -->
    <template v-else>
      <input
        ref="inputFileRef"
        type="file"
        class="input"
        :multiple="data.multiple || false"
        :accept="data.accept || FILE_ACCEPT"
        :disabled="data.disabled"
        @change="onChange"
      />
      <!-- 上传提示插槽 -->
      <slot name="tips">
        <div v-if="!data.hideTips || data.tips" class="tips f-mb10">
          {{ data.tips || tips }}
        </div>
      </slot>
      <div class="list">
        <!-- 上传按钮插槽 -->
        <slot
          v-if="!data.limit || files.length < data.limit"
          name="upload"
          :files="files"
        >
          <div v-if="data.uploadBtnText" class="btn f-mb10">
            <ht-button
              :data="{
                type: data.uploadBtnType,
                icon: data.uploadBtnIcon,
                content: data.uploadBtnText,
                size: data.uploadBtnSize,
                disabled: data.disabled,
              }"
              @click="onUpload"
            />
          </div>
          <div v-else class="item f-mr10 f-mb10">
            <div
              class="content content-1 f-trans f-curp"
              :class="{ 'content-disabled': data.disabled }"
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
            <ht-button
              v-if="!data.hideOperation && files.length"
              class="f-mt5"
              :data="{ size: 'small', style: 'width: 100px' }"
              @click="onDeleteAll"
            >
              删除全部
            </ht-button>
          </div>
        </slot>

        <!-- 文件预览插槽 -->
        <slot name="preview" :files="files">
          <div
            v-for="(file, index) in files"
            v-show="!data.hideFiles"
            :key="index"
            class="item f-mr10 f-mb10"
            @click="onPreview(file, index)"
          >
            <div class="content content-2 f-curp">
              <!-- 文件区域 -->
              <ht-image
                :data="{
                  src: file.isImage ? file.thumbSrc || file.src : FILE_COVER,
                }"
              />
              <!-- 文件标签 -->
              <ht-tag v-if="!file.isImage" class="tag">{{
                file.extension
              }}</ht-tag>
              <!-- 文件操作 -->
              <div v-if="!data.hideOperation" class="tools f-df f-jcc f-trans">
                <!-- 左移 -->
                <ht-icon
                  v-if="index > 0"
                  class="f-ml5 f-mr5"
                  :data="{ name: 'u-icon-moveLeft' }"
                  @on-click.stop="onMove('prev', file, index)"
                />
                <!-- 删除 -->
                <ht-icon
                  class="f-ml5 f-mr5"
                  :data="{ name: 'u-icon-delete' }"
                  @on-click.stop="onDelete(file, index)"
                />
                <!-- 下载 -->
                <ht-icon
                  class="f-ml5 f-mr5"
                  :data="{ name: 'u-icon-download' }"
                  @on-click.stop="onDownload(file, index)"
                />
                <!-- 右移 -->
                <ht-icon
                  v-if="index < files.length - 1"
                  class="f-ml5 f-mr5"
                  :data="{ name: 'u-icon-moveRight' }"
                  @on-click.stop="onMove('next', file, index)"
                />
              </div>
            </div>
            <!-- 文件名称 -->
            <div
              v-if="!data.hideFileName"
              class="fileName s-fc5 f-tac f-txtell"
            >
              {{ file.name }}
            </div>
          </div>
        </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, computed, watch } from "vue";
import { dom } from "@htfed/utils";
import HtToast from "../HtToast";
import { UploadData, FileItem, InputFileItem } from "./types";

/**
 * 文件上传组件，支持所有格式的文件上传。
 * */
export default defineComponent({
  name: "HtUpload",

  props: {
    // 文件列表
    modelValue: {
      type: String || Array,
      required: true,
      default: () => [],
    },
    // 配置数据
    data: {
      type: Object as PropType<UploadData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const inputFileRef = ref<HTMLInputElement | null>(null);
    const files: any[] = reactive([]);
    const SIZE_UNITS = {
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
    };
    const action: string = props.data.action || "https://xxxx";
    const imgDomain: string = props.data.imgDomain || "https://image.xxxx.com";
    const FILE_COVER: string =
      "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b295ba4df889443b81b8434d046a39e5~tplv-k3u1fbpfcp-watermark.image";
    const FILE_ACCEPT: string = "image/*,application/pdf,*/mp4";
    const loading = ref(false);
    // 文件上传提示
    const tips = computed(() => {
      const { multiple, width, height, extensions, maxSize, limit } =
        props.data;
      const tipsContent = [`支持${multiple ? "多" : "单"}张上传`];
      if (width && width > 0) tipsContent.push(`宽度限制${width}px`);
      if (height && height > 0) tipsContent.push(`高度限制${height}px`);
      if (extensions) tipsContent.push(`格式仅支持${extensions}`);
      if (maxSize) tipsContent.push(`大小限制${maxSize}内`);
      if (limit && limit > 0) tipsContent.push(`上传总数限制${limit}张`);
      return tipsContent.join("，");
    });
    const onValueChange = () => {
      const modelValue = files.map((i: any) => i.src);
      /**
       * 文件列表更新
       * @param {Array} files 文件列表
       */
      emit(
        "update:modelValue",
        props.data?.limit === 1 ? modelValue?.[0] : modelValue
      );

      /**
       * 文件列表更新
       * @param {Array} files 文件列表
       */
      emit("on-change", files);
    };

    /**
     * 获取文件后缀信息
     * @param {String} path 文件路径
     * @returns {Object} object 文件后缀对象，值包含extension，isImage
     */
    const onGetExtension = (path: string) => {
      if (path.indexOf("?") > -1) path = path.substring(0, path.indexOf("?"));
      const pathArr = path.split("/");
      const name = pathArr[pathArr.length - 1];
      const extension = name
        ?.substring(name.lastIndexOf(".") + 1)
        ?.toLowerCase();
      return {
        name,
        extension,
        isImage: ["png", "jpg", "jpeg", "bmp", "webp"].includes(extension),
      };
    };

    /**
     * 设置显示的文件列表
     * @returns void
     */
    const onSetFiles = () => {
      const { modelValue } = props;
      const targetFiles: any[] = Array.isArray(modelValue)
        ? modelValue
        : [modelValue];
      files.splice(0);
      targetFiles
        ?.filter((file: string | FileItem) => !!file)
        ?.forEach((file: string | FileItem) => {
          if (typeof file === "string") {
            files.push({
              src: file,
              ...(onGetExtension(file) || {}),
            });
          } else {
            files.push({
              ...file,
              ...(onGetExtension(file.src) || {}),
            });
          }
        });
    };
    onSetFiles();

    /**
     * 重置上传界面
     * @returns void
     */
    const onReset = () => {
      loading.value = false;
      inputFileRef.value && (inputFileRef.value.value = "");
    };

    /**
     * 文件后缀名校验
     * @param {Object} file 当前文件对象
     * @param {String} extensions 可支持的文件扩展名
     * @returns {Promise} result 校验结果
     */
    const onCheckExtensions = (
      file: InputFileItem,
      extensions: string | string[] | undefined
    ) => {
      return new Promise((resolve, reject) => {
        const result = onGetExtension(file.name);
        if (!extensions) {
          resolve(result);
          return;
        }
        if (extensions.indexOf(result.extension) > -1) {
          resolve(result);
          return;
        }
        const params = {
          name: "ExtensionError",
          message: `仅支持上传${extensions}类型的文件！`,
          data: result,
        };
        reject(params);
      });
    };

    /**
     * 文件大小校验
     * @param {Object} file 当前文件对象
     * @param {String} maxSize 可支持的文件最大值
     * @param {Object} options 文件结果对象
     * @returns {Promise} result 校验结果
     */
    const onCheckSize = (
      file: InputFileItem,
      maxSize: string | number | undefined,
      options: any
    ) => {
      return new Promise((resolve, reject) => {
        const result = {
          ...options,
          size: file.size,
        };
        if (!maxSize) {
          resolve(result);
          return;
        }
        if (typeof maxSize !== "number") {
          // 按照单位换算
          const unit = maxSize.slice(-2);
          if (!SIZE_UNITS[unit]) {
            const params = {
              name: "SizeUnitError",
              message: "尺寸单位不支持！可选单位是KB/MB/GB",
              data: {
                unknownUnit: unit,
                units: Object.keys(SIZE_UNITS),
              },
            };
            reject(params);
            return;
          }
          maxSize = ~~maxSize.slice(0, -2) * SIZE_UNITS[unit];
        }
        if (file.size <= maxSize) {
          resolve(result);
          return;
        }
        const params = {
          name: "SizeError",
          message: "文件大小超出限制！",
          data: {
            maxSize,
            size: file.size,
          },
        };
        reject(params);
      });
    };

    /**
     * 文件尺寸校验
     * @param {Object} file 当前文件对象
     * @param {Number} width 上传文件指定宽度
     * @param {Number} height 上传文件指定高度
     * @param {Object} options 文件结果对象
     * @returns {Promise} result 校验结果
     */
    const onCheckDimension = (
      file: Blob,
      width: string | number | undefined,
      height: string | number | undefined,
      options: any
    ) => {
      return new Promise((resolve, reject) => {
        // 如果没设置宽高，不用校验
        if (!width && !height) {
          resolve(options);
          return;
        }
        // 如果设置宽/高，但是格式非图片，则校验不通过
        if ((width || height) && !options.isImage) {
          const params = {
            name: "DimensionError",
            message: "文件有尺寸限制，仅支持图片格式！",
            data: {
              options,
            },
          };
          reject(params);
          return;
        }
        // 读取图片数据
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e?.target?.result;
          // 加载图片获取图片真实宽度和高度
          const image: any = new Image();
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
            // 如果设置了宽高
            if (width && height) {
              if (
                width &&
                width === imgWidth &&
                height &&
                height === imgHeight
              ) {
                resolve(result);
                return;
              }

              const params = {
                name: "DimensionError",
                message: `图片没有按照指定宽度和高度上传！指定尺寸为${width}px*${height}px`,
                data: result,
              };
              reject(params);
              return;
            }
            if (width) {
              // 如果设置了图片宽度，且上传图片的宽度等于设置宽度时
              if (width && width === imgWidth) {
                resolve(result);
                return;
              }

              const params = {
                name: "DimensionWidthError",
                message: `图片没有按照指定宽度上传！指定宽度为${width}px`,
                data: result,
              };
              reject(params);
              return;
            }
            if (height) {
              // 如果设置了图片高度，且上传图片的高度等于设置高度时
              if (height && height === imgHeight) {
                resolve(result);
                return;
              }

              const params = {
                name: "DimensionHeightError",
                message: `图片没有按照指定高度上传！指定高度为${height}px`,
                data: result,
              };
              reject(params);
            }
          };
          image.src = data;
        };
        reader.readAsDataURL(file);
      });
    };

    /**
     * 文件上传
     * @param {Object} file 当前文件对象
     * @param {Object} options 文件结果对象
     * @returns {Promise} result 上传结果
     */
    const onUploadFile = (file: any, options: any) => {
      return fetch(action)
        .then((res: any) => res.json())
        .then((res: any) => {
          const { token, key } = res.data;
          const { extension } = options || onGetExtension(file.name);

          const formData = new FormData();
          formData.append("token", token);
          formData.append("file", file);
          formData.append("key", `${key}.${extension}`);
          return fetch("https://upload.qiniup.com/", {
            method: "POST",
            body: formData,
          })
            .then((result: any) => result.json())
            .then(async (result: any) => {
              onReset();
              const src = `${imgDomain}/${result.key}.${extension}`;
              const srcArr = src.split("/");
              const imgData = {
                ...options,
                src,
                name: srcArr[srcArr.length - 1],
                thumbSrc: src,
              };
              files.push(imgData);
              onValueChange();

              const params = {
                files,
                file: imgData,
                index: files.length - 1,
              };
              /**
               * 文件上传成功
               * @param {Object} params 文件对象，值有files, file, index
               */
              emit("on-success", params);
              return params;
            });
        });
    };

    /**
     * 文件校验
     * @param {Object} file 当前文件对象
     * @returns void
     */
    const onCheckFile = (file: any) => {
      // 校验文件是否有名字
      if (!file || !file.name) return;
      loading.value = true;
      const { extensions, maxSize, width, height } = props.data;
      onCheckExtensions(file, extensions)
        .then((options) => onCheckSize(file, maxSize, options))
        .then((options) => onCheckDimension(file, width, height, options))
        .then((options) => onUploadFile(file, options))
        .catch((err) => {
          onReset();
          HtToast.error(err.message || "上传失败，请稍后再试！");

          /**
           * 文件上传失败
           * @param {Object} result 失败对象
           */
          emit("on-error", err);
        });
    };

    /**
     * 文件选择更新
     * @returns void
     */
    const onChange = () => {
      const { files: inputFiles, value } = inputFileRef.value || {};
      // 如果输入框没有选中文件，则退出
      if ((!inputFiles || !inputFiles.length) && !value) return;
      const targetFiles = inputFiles || [
        {
          name: value,
          size: 0,
        },
      ];
      // 限制文件上传数量逻辑
      const { limit } = props.data;
      const count =
        limit && limit > 0 && targetFiles.length > limit - files.length
          ? Math.max(limit - files.length, 0)
          : targetFiles.length;
      if (count === 0) {
        HtToast.error("图片总数超过上传总数限制！");

        /**
         * 文件上传失败
         * @param {Object} result 失败对象
         */
        emit("on-error", {
          name: "LimitError",
          message: "图片总数超过上传总数限制！",
          data: { limit },
        });
        return;
      }
      for (let i = 0; i < count; i++) {
        onCheckFile(targetFiles[i]);
      }
    };

    /**
     * 文件上传
     * @returns void
     */
    const onUpload = () => {
      inputFileRef.value?.click();
    };

    /**
     * 文件全部删除
     * @returns void
     */
    const onDeleteAll = () => {
      files.length = 0;
      onValueChange();
      onReset();

      /**
       * 文件全部删除
       */
      emit("on-delete-all");
    };

    /**
     * 文件预览
     * @param {Object} file 文件对象
     * @param {Number} index 文件索引
     * @returns void
     */
    const onPreview = (file: FileItem, index: number) => {
      let { src, extension } = file;
      if (!src) return;
      extension = extension || onGetExtension(src)?.extension;
      src = ["xlsx", "doc", "docx"].includes(extension)
        ? `https://view.officeapps.live.com/op/view.aspx?src=${src}`
        : src;
      window.open(src);

      /**
       * 文件预览
       * @param {Object} result 文件对象，值有files, file, index
       */
      emit("on-preview", {
        files,
        file,
        index,
      });
    };

    /**
     * 文件移动
     * @param {String} type 移动类型，prev为前移，next为后移
     * @param {Object} file 文件对象
     * @param {Number} index 文件索引
     * @returns void
     */
    const onMove = (type: string, file: FileItem, index: number) => {
      files.splice(index, 1);

      if (type === "prev") {
        files.splice(index - 1, 0, file);
        /**
         * 文件前移
         * @param {Object} result 文件对象，值有files, file, index
         */
        emit("on-move-prev", {
          files,
          file,
          index,
        });
      }

      if (type === "next") {
        files.splice(index + 1, 0, file);
        /**
         * 文件后移
         * @param {Object} result 文件对象，值有files, file, index
         */
        emit("on-move-next", {
          files,
          file,
          index,
        });
      }
      onValueChange();
    };

    /**
     * 文件删除
     * @param {Object} file 文件对象
     * @param {Number} index 文件索引
     * @returns void
     */
    const onDelete = (file: FileItem, index: number) => {
      files.splice(index, 1);
      onValueChange();
      onReset();

      /**
       * 文件删除
       * @param {Object} result 文件对象，值有files, file, index
       */
      emit("on-delete", {
        files,
        file,
        index,
      });
    };

    /**
     * 文件下载
     * @param {Object} file 文件对象
     * @param {Number} index 文件索引
     * @returns void
     */
    const onDownload = (file: FileItem, index: number) => {
      const { src, name } = file;
      dom.onDownloadFile({ url: src, name });

      /**
       * 文件下载
       * @param {Object} result 文件对象，值有files, file, index
       */
      emit("on-download", {
        files,
        file,
        index,
      });
    };

    // 监听modelValue变化
    watch(
      () => props.modelValue,
      () => {
        onSetFiles();
      },
      {
        deep: true,
      }
    );

    return {
      inputFileRef,
      SIZE_UNITS,
      FILE_COVER,
      FILE_ACCEPT,
      loading,
      files,
      tips,
      onChange,
      onUpload,
      onUploadFile,
      onDeleteAll,
      onMove,
      onPreview,
      onDelete,
      onDownload,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
