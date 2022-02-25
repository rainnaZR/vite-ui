<template>
  <div class="ht-login">
    <!-- 登录tab -->
    <ht-tab
      v-model:modelValue="type"
      :data="tabData"
      @on-change="onRefreshVerify"
    />

    <div class="content">
      <!-- 账号密码登录 -->
      <template v-if="type == 'password'">
        <ht-form-page :data="formData[type]" @on-action="onAction">
          <!-- 图形验证码 -->
          <template #verifyCode="detail">
            <div class="f-df">
              <ht-input
                v-model:modelValue="formData[type].model[detail.scope.prop]"
                :data="detail.scope.itemProps"
              />
              <div class="verifyImg f-ml10" @click="onRefreshVerify">
                <img :src="data.verifyImgUrl" />
              </div>
            </div>
          </template>
        </ht-form-page>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted } from "vue";
import { LoginData } from "./types";

export default defineComponent({
  name: "HtLogin",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<LoginData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const defaultTabData = {
      list: [
        {
          label: "钉钉扫码",
          value: "dingding",
        },
        {
          label: "账号密码登录",
          value: "password",
        },
        {
          label: "验证码登录",
          value: "phoneCode",
        },
      ],
    };
    const defaultPasswordFormData = {
      model: {
        userName: "",
        password: "",
        verifyCode: "",
      },
      fields: [
        {
          type: "input",
          prop: "userName",
          required: true,
          itemProps: {
            placeholder: "请输入用户名",
            prefixIcon: "u-icon-user",
            clearable: true,
          },
        },
        {
          type: "input",
          prop: "password",
          required: true,
          itemProps: {
            placeholder: "请输入密码",
            prefixIcon: "u-icon-password",
            clearable: true,
            password: true,
          },
        },
        {
          type: "input",
          prop: "verifyCode",
          required: true,
          itemProps: {
            placeholder: "请输入验证码",
          },
        },
      ],
      action: [
        {
          type: "submit",
          text: "登录",
          btnType: "primary",
          full: true,
        },
      ],
    };
    // 登录类型tab
    const tabData = computed(() => props.data?.tabData || defaultTabData);
    // 当前登录类型
    const type = ref(props.data?.currentType || tabData.value.list[0].value);
    // 当前登录表单
    const formData = computed(() => ({
      password: props.data?.passwordFormData || defaultPasswordFormData,
    }));
    const onRefreshVerify = () => {
      type.value === "password" && emit("on-refresh-verify");
    };

    // 表单行为点击
    const onAction = () => {};

    onMounted(() => {
      onRefreshVerify();
    });

    return {
      tabData,
      type,
      formData,
      onRefreshVerify,
      onAction,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
