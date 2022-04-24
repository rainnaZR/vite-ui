<template>
  <div class="ht-login-pwd">
    <ht-form-page :data="formData" @on-action="onAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { LoginPwdData } from "./types";

// 登录页面。
export default defineComponent({
  name: "HtLoginPwd",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<LoginPwdData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const defaultFormData = {
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
          type: "codeInput",
          prop: "verifyCode",
          required: true,
          itemProps: {
            placeholder: "请输入验证码",
            verifyImgUrl: "",
          },
          itemEvents: {
            onGetCode: () => {
              /**
               * 获取验证码信息
               */
              emit("on-get-code");
            },
          },
        },
      ],
      actions: [
        {
          type: "submit",
          content: "登录",
          btnType: "primary",
          full: true,
        },
      ],
    };
    const formData = reactive(props.data.formData || defaultFormData);

    /**
     * 表单行为点击
     * @param {Object} formModel 表单数据
     * @returns void
     */
    const onAction = (result: any) => {
      const { valid, formModel } = result || {};
      if (!valid) return;
      /**
       * 表单行为点击事件触发
       * @param {Object} formModel 表单数据
       */
      emit("on-login", formModel);
    };

    /**
     * 设置验证码信息
     * @param {String} value 验证码图片地址
     * @param {String} prop 验证码属性名
     * @returns void
     */
    const onSetCode = (value: string, prop?: string) => {
      const targetProp = prop || "verifyCode";
      const targetField = formData?.fields?.filter(
        (i) => i.prop === targetProp
      )?.[0];
      targetField &&
        targetField.itemProps &&
        (targetField.itemProps.verifyImgUrl = value);
      formData.model[targetProp] = "";
    };

    return {
      formData,
      onAction,
      onSetCode,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
