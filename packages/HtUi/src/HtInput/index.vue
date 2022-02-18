<template>
  <div class="ht-input" :style="data.wrapStyle">
    <!-- 输入框头部插槽 -->
    <slot name="prepend" :scope="data"></slot>
    <textarea
      v-if="data.type === 'textarea'"
      v-model="inputVal"
      :class="[
        'textarea',
        {
          'textarea-readonly': data.readonly,
        },
        {
          'textarea-disabled': disabled,
        },
        'f-trans',
      ]"
      :style="onGetStyle()"
      :rows="data.rows || 5"
      :name="data.name"
      :placeholder="data.placeholder || '请输入...'"
      :readonly="data.readonly"
      :disabled="disabled"
      :autofocus="data.autofocus"
      :autocomplete="data.autocomplete"
      :maxlength="data.maxLength || -1"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
    >
    </textarea>
    <input
      v-else
      v-model="inputVal"
      :class="[
        'input',
        {
          'input-readonly': data.readonly,
        },
        {
          'input-disabled': disabled,
        },
        'f-trans',
      ]"
      :style="onGetStyle()"
      :type="inputType"
      :name="data.name"
      :placeholder="data.placeholder || '请输入...'"
      :readonly="data.readonly"
      :disabled="disabled"
      :autofocus="data.autofocus"
      :autocomplete="data.autocomplete"
      :maxlength="data.maxLength || -1"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
      @keyup.enter="onChange"
    />
    <div class="action">
      <!-- 输入框前缀插槽 -->
      <slot name="prefix" :scope="data"></slot>
      <!-- 自定义前缀icon名称 -->
      <span v-if="data.prefixIcon" class="f-curp">
        <ht-icon
          :data="{ name: data.prefixIcon }"
          @click="onAction('prefixIcon')"
        />
      </span>
    </div>
    <div class="action action-1">
      <!-- 字数 -->
      <span v-if="data.maxLength > 0">
        {{ inputVal.length }}/{{ data.maxLength }}
      </span>
      <!-- 清除icon -->
      <ht-icon
        v-if="data.clearable"
        class="f-curp f-ml5"
        :data="{ name: 'u-icon-clear' }"
        @click="onAction('clearable')"
      />
      <!-- 密码显示/隐藏icon -->
      <ht-icon
        v-if="data.password"
        class="f-curp f-ml5"
        :data="{
          name: `${
            inputType === 'password' ? 'u-icon-hidePreview' : 'u-icon-preview'
          }`,
        }"
        @click="onAction('password')"
      />
      <!-- 搜索icon -->
      <ht-icon
        v-if="data.search"
        class="f-curp f-ml5"
        :data="{ name: 'u-icon-search' }"
        @click="onAction('search')"
      />
      <!-- 自定义后缀icon名称 -->
      <ht-icon
        v-if="data.suffixIcon"
        class="f-curp f-ml5"
        :data="{ name: data.suffixIcon }"
        @click="onAction('suffixIcon')"
      />
      <!-- 输入框后缀插槽 -->
      <slot name="suffix" :scope="data"></slot>
    </div>
    <!-- 输入框尾部插槽 -->
    <slot name="append" :scope="data"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject, ref, watch } from "vue";
import HtIcon from "../HtIcon";
import { InputData } from "./types";
import { FormContext, formKey } from "../HtForm/types";

// 表单中的输入框组件。
export default defineComponent({
  name: "HtInput",

  components: {
    HtIcon,
  },

  props: {
    // input输入框中的值
    modelValue: {
      type: [String, Number],
      required: true,
      default: "",
    },
    // 配置数据
    data: {
      type: Object as PropType<InputData>,
      required: true,
      default: () => ({
        type: "text",
      }),
    },
  },

  setup(props, { emit }) {
    const form: FormContext | undefined = inject(formKey);
    const inputType = ref<string>("text"); // 输入框类型
    const inputVal = ref<string | number>(""); // 输入框值
    const isFocus = ref(false); // 是否聚焦
    const disabled = props.data.disabled || form?.data.disabled;
    inputType.value = props.data.password
      ? "password"
      : props.data.type || "text";

    /**
     * 获取输入框样式
     * @returns {Object} style 输入框样式
     */
    const onGetStyle = (): any => {
      const actionWidth = 25;

      let paddingLeft = 10;
      let leftActionCount = 0;
      props.data.prefixIcon && leftActionCount++; // 自定义icon
      paddingLeft += actionWidth * leftActionCount;

      let paddingRight = 10;
      props.data.maxLength && props.data.maxLength > 0 && (paddingRight += 40);
      let rightActionCount = 0;
      props.data.clearable && rightActionCount++; // 清除icon
      props.data.password && rightActionCount++; // 密码切换icon
      props.data.search && rightActionCount++; // 搜索icon
      props.data.suffixIcon && rightActionCount++; // 自定义icon
      paddingRight += actionWidth * rightActionCount;

      return {
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`,
        "box-shadow": isFocus.value
          ? `0 0 5px -1px ${
              props.data.focusBorderColor || props.data.borderColor
            }`
          : "",
        borderColor: isFocus.value
          ? props.data.focusBorderColor || props.data.borderColor
          : props.data.borderColor,
        color: props.data.color,
        ...(props.data.inputStyle || {}),
      };
    };

    /**
     * 输入框focus事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onFocus = (e: MouseEvent) => {
      if (disabled) return;
      isFocus.value = true;
      /**
       * 输入框focus事件触发
       * @param {String} value 输入框value值
       * @param {Object} event MouseEvent对象
       */
      emit("on-focus", inputVal.value, e);
    };

    /**
     * 输入框blur事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onBlur = (e: MouseEvent) => {
      if (disabled) return;
      isFocus.value = false;
      /**
       * 输入框blur事件触发
       * @param {String} value 输入框value值
       * @param {Object} event MouseEvent对象
       */
      emit("on-blur", inputVal.value, e);
    };

    /**
     * 输入框change事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onChange = (e: MouseEvent) => {
      if (disabled) return;
      /**
       * 输入框change事件触发
       * @param {String} value 输入框value值
       * @param {Object} event MouseEvent对象
       */
      emit("on-change", inputVal.value, e);
    };

    /**
     * 输入框input事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onInput = (e: MouseEvent) => {
      if (disabled) return;
      /**
       * 输入框input事件触发
       * @param {String} value 输入框value值
       * @param {Object} event MouseEvent对象
       */
      emit("on-input", inputVal.value, e);
    };

    /**
     * 操作行为点击事件
     * @param {String} type 操作行为类型
     * @returns void
     */
    const onAction = (type: string) => {
      switch (type) {
        case "clearable":
          inputVal.value = "";
          break;
        case "password":
          inputType.value =
            inputType.value === "password" ? "text" : "password";
          break;
        default:
          break;
      }
      /**
       * 操作行为点击事件触发
       * @param {String} type 操作行为类型
       * @param {String} value 输入框value值
       */
      emit("on-action", type, inputVal.value);
    };

    // 监听参数 value 的变化
    watch(
      () => props.modelValue,
      (value) => {
        inputVal.value = value; // 设置 value
      },
      {
        immediate: true,
      }
    );

    // 监听输入框的值的变化
    watch(inputVal, (value) => {
      /**
       * 输入框input值更新
       * @param {String} value 输入框input值
       */
      emit("update:modelValue", value);
    });

    return {
      form,
      inputType,
      inputVal,
      isFocus,
      disabled,
      onGetStyle,
      onFocus,
      onBlur,
      onChange,
      onInput,
      onAction,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
