<template>
  <div
    class="ht-avatar"
    :style="{
      width: `${data.width || defaultWidth}px`,
      height: `${data.height || defaultWidth}px`,
      borderRadius: `${data.height || defaultWidth}px`,
      ...(data.style || {}),
    }"
  >
    <!-- 文字头像 -->
    <div v-if="type == 'text'" class="content f-tac" :style="onGetStyle()">
      <!-- 默认内容插槽 -->
      <slot>{{ data.content }}</slot>
    </div>
    <!-- 图片头像 -->
    <ht-image
      v-else
      :data="{
        src: avatarImg,
        width: data.width || defaultWidth,
        height: data.height || defaultWidth,
        fit: 'cover',
      }"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  getCurrentInstance,
  computed,
  ref,
} from "vue";
import { AvatarData } from "./types";

/**
 * 用户头像，包括文字头像。
 * */
export default defineComponent({
  name: "HtAvatar",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<AvatarData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const { proxy } = getCurrentInstance() || {};
    const {
      type: avatarType,
      content,
      limit,
      src,
      defaultImg = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      height = 30,
    } = props.data;
    const type = computed(
      () => avatarType || (content || proxy?.$slots?.default ? "text" : "image")
    );
    const avatarImg = computed(() => src || defaultImg);
    const defaultWidth = ref(30);
    const onGetStyle = () => {
      if (!content)
        return {
          lineHeight: `${height}px`,
        };
      let length = limit || content.length;
      length = Math.min(3, length);
      const radio = length === 3 ? 0.3 : length === 2 ? 0.4 : 0.6;
      return {
        fontSize: `${height * radio}px`,
        lineHeight: `${height}px`,
      };
    };

    return {
      type,
      avatarImg,
      defaultWidth,
      onGetStyle,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
