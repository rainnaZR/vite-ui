# HtLoginPwd 密码登录表单

### `Category: business`


## 代码演示


### 基本用法

- 组件支持输入用户名，密码，验证码来实现登录。

::: Demo
```vue demo
<template>
  <div style="width: 400px">
    <ht-login-pwd ref="loginRef" @on-get-code="onGetCode" @on-login="onLogin" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { request } from "@htfed/utils";

request.init();
export default defineComponent({
  setup() {
    const loginRef = ref(null);
    const onGetCode = () => {
      request
        .get("https://xxx.com/common/captcha")
        .then((res) => {
          loginRef.value.onSetCode(res.data.data.img, 'verifyCode');
        });
    };
    const onLogin = (formModel) => console.log(formModel)
    return {
      loginRef,
      onGetCode,
      onLogin,
    };
  },
});
</script>
```
:::