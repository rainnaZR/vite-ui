<template>
  <div
    v-loading="loading && !data.hideLoading"
    :class="['ht-form-page', { 'ht-form-page-inline': data.inline }]"
  >
    <!-- 表单描述区 -->
    <div
      :class="[
        'header',
        {
          'f-mb20': data.title || data.subTitle,
        },
      ]"
    >
      <div class="f-fs18 f-fw1 s-fc4">
        <!-- 表单标题插槽 -->
        <slot name="formTitle">{{ data.title }}</slot>
      </div>
      <div class="f-mt5 f-fs13 s-fc6">
        <!-- 表单副标题插槽 -->
        <slot name="formSubTitle">{{ data.subTitle }}</slot>
      </div>
    </div>

    <!-- 表单内容区 -->
    <ht-form ref="formRef" :data="formConfig">
      <div
        v-for="(group, index) in formGroup"
        :key="`group-${index}`"
        :class="`${formGroup.length > 1 ? 'f-mb30' : ''}`"
      >
        <!-- 表单项描述区 -->
        <div
          :class="[
            'header',
            {
              'f-mb20': group.title || group.subTitle,
            },
          ]"
        >
          <div class="f-fs16 s-fc4">
            <!-- 表单项标题插槽 -->
            <slot name="formItemTitle">{{ group.title }}</slot>
          </div>
          <div class="f-fs12 s-fc6">
            <!-- 表单项副标题插槽 -->
            <slot name="formItemSubTitle">{{ group.subTitle }}</slot>
          </div>
        </div>

        <!-- 表单项内容区 -->
        <div class="main">
          <ht-form-item
            v-for="(field, fieldIndex) in group.fields"
            v-show="!field.hide"
            :key="`field-${fieldIndex}`"
            :data="onGetFormItemConfig(field)"
          >
            <!-- 表单项内容插槽 -->
            <slot :name="field.prop" :scope="field">
              <component
                v-if="field.type"
                v-model:modelValue="formModel[field.prop]"
                :is="`ht-${field.type}`"
                :data="field.itemProps"
                v-on="field.itemEvents"
              />
              <div v-else>{{ formModel[field.prop] }}</div>
            </slot>
          </ht-form-item>
        </div>
      </div>

      <!-- 表单项操作按钮区 -->
      <ht-form-item>
        <!-- 表单项操作按钮插槽 -->
        <slot name="formAction" :scope="formActions">
          <div class="f-mt20">
            <ht-button
              v-for="(action, index) in formActions"
              :key="`action-${index}`"
              :data="{
                ...action,
                type: action.btnType,
                size: action.btnSize || `${data.inline ? 'normal' : 'big'}`,
              }"
              @click="onFormAction(action)"
            >
              {{ action.content }}
            </ht-button>
          </div>
        </slot>
      </ht-form-item>
    </ht-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  computed,
  onMounted,
} from "vue";
import HtToast from "../HtToast";
import { FormData, FormContext, Model } from "../HtForm/types";
import { FormPageData, FieldItem, ActionItem } from "./types";

// 复杂表单配置组件。
export default defineComponent({
  name: "HtFormPage",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<FormPageData>,
      required: true,
      default: () => ({
        model: {},
        rules: {},
      }),
    },
  },

  setup(props, { emit }) {
    const loading = ref(false);
    const formRef = ref<FormContext>();
    const {
      model,
      rules,
      inline,
      labelWidth,
      labelStyle,
      labelPosition,
      contentStyle,
      formStyle,
      showValidMessage,
      disabled,
    } = props.data;
    const formModel = ref(model);
    // 表单配置数据
    const formConfig: FormData = reactive({
      model: formModel,
      rules,
      inline,
      labelWidth,
      labelStyle,
      labelPosition,
      contentStyle,
      formStyle,
      showValidMessage,
      disabled,
    });
    const formGroup = computed(() =>
      props.data.fields ? [{ fields: props.data.fields }] : props.data.group
    );

    /**
     * 表单项配置数据
     * @param {Object} field 当前表单项字段field数据
     * @returns {Object} config 表单项formItem配置数据
     */
    const onGetFormItemConfig = (field: FieldItem) => {
      const config = { ...field };
      config.itemProps && delete config.itemProps;
      config.itemEvents && delete config.itemEvents;
      return config;
    };

    /**
     * 表单操作行为初始化
     * @param {Array} list 表单的操作按钮列表
     * @param {Object} defaultActions 表单的默认操作配置项
     * @param {Object} data 当前业务数据，用于操作按钮的显示过滤
     * @returns {Array} result 表单项操作按钮配置
     * */
    const onInitActions = (
      list: string[] | ActionItem[] = ["submit", "reset"],
      defaultActions = {},
      data = {}
    ) =>
      list
        ?.map((item: string | ActionItem) => {
          const actionItem: ActionItem =
            typeof item === "string"
              ? {
                  type: item,
                  ...(defaultActions[item] || {}),
                }
              : typeof item === "object"
              ? {
                  ...(defaultActions[item.type] || {}),
                  ...item,
                }
              : {};
          actionItem.hide = false;
          // 如果没有限制条件，直接展示
          if (!actionItem.limit) return actionItem;
          const { limit } = actionItem;
          // limit支持两种类型判断：对象类型，函数，用于判断该操作是否展示
          // 对象类型的limit
          if (limit instanceof Object) {
            Object.keys(limit).forEach((key) => {
              if (limit[key] !== data[key]) actionItem.hide = true;
            });
          }
          // 函数类型的limit
          if (typeof limit === "function") {
            actionItem.hide = !limit(data);
          }
          return actionItem;
        })
        .filter((actionItem) => !actionItem.hide);

    // 表单默认行为数据
    const defaultActions = reactive({
      submit: {
        content: "提交",
        btnType: "primary",
      },
      reset: {
        content: "重置",
      },
    });

    // 表单操作行为
    const formActions = computed(() =>
      onInitActions(props.data?.actions, defaultActions)
    );

    /**
     * 表单字段的循环操作
     * @param {Function} callback 循环字段时执行的回调函数
     * @returns void
     */
    const onLoopFields = (callback: any) => {
      formGroup.value?.forEach((group) => {
        group?.fields?.forEach((field) => callback && callback(field));
      });
    };

    /**
     * 初始化表单创建
     * @param {Object} createInfo 接口返回的表单初始配置数据，比如下拉框的选项
     * @returns void
     * */
    const onInitFormCreate = (createInfo: any) => {
      if (!createInfo) return;
      onLoopFields((field: FieldItem) => {
        const { prop, type, itemProps = {} } = field;
        if (!prop || !createInfo[prop]) return;
        // 初始值设定
        if (["select", "radio", "checkbox"].includes(type)) {
          field.itemProps = {
            ...itemProps,
            options: createInfo[prop],
          };
        }
      });
    };

    /**
     * 初始化表单生成
     * @param {Object} formInfo 接口返回的表单初始化显示值
     * @returns void
     */
    const onInitFormDetail = (formInfo: Model) => {
      formModel.value = {
        ...(formModel.value || {}),
        ...(formInfo || {}),
      };
    };

    /**
     * 初始化获取表单数据
     * @returns void
     */
    const onGetFormInitInfo = async () => {
      const { xhr, getParams, callback } =
        props.data?.request?.formInitial || {};
      if (!xhr) return;

      loading.value = true;
      try {
        const params = typeof getParams === "function" && getParams();
        const result = await xhr(params);
        const { createInfo, formInfo } = result || {};
        // 初始化表单创建
        onInitFormCreate(createInfo);
        // 初始化表单详情
        onInitFormDetail(formInfo);
        loading.value = false;

        // 回调事件定义
        const callbackParams = {
          response: result,
          formModel: formModel.value,
        };
        if (typeof callback === "function") {
          callback(callbackParams);
        }
        /**
         * 表单初始化事件触发
         * @param {Object} params 回调参数，值为{response, formModel}
         */
        emit("cb-initial", callbackParams);
      } catch (err) {
        loading.value = false;
        HtToast.error("接口调用异常，请稍后再试");
      }
    };

    /**
     * 表单重置
     * @returns void
     */
    const onFormReset = () => {
      formRef.value?.onReset();
    };

    /**
     * 表单提交
     * @returns void
     */
    const onFormSubmit = () => {
      formRef.value?.onValidate().then(async ({ valid, invalidFields }) => {
        /**
         * 表单按钮点击事件触发
         * @param {String} type 按钮点击类型
         * @param {Object} formModel 表单数据
         */
        emit("on-action", {
          type: "submit",
          formModel: formModel.value,
          valid,
          invalidFields,
        });
        if (!valid) return;

        // 获取接口配置
        const { xhr, getParams, callback } =
          props.data?.request?.formSubmit || {};
        if (!xhr) return;

        // 提交表单
        loading.value = true;
        try {
          const params =
            typeof getParams === "function" &&
            getParams({ ...formModel.value });
          const result = await xhr(params);
          loading.value = false;

          const { code, message } = result;
          if (code === 0) {
            HtToast.success(message);
            onFormReset();
          }

          // 回调事件定义
          const callbackParams = {
            response: result,
            formModel: formModel.value,
          };
          if (typeof callback === "function") {
            callback(callbackParams);
          }
          /**
           * 表单初始化事件触发
           * @param {Object} params 回调参数，值为{response, formModel}
           */
          emit("cb-submit", callbackParams);
        } catch (err) {
          loading.value = false;
          HtToast.error("接口调用异常，请稍后再试");
        }
      });
    };

    /**
     * 表单操作
     * @param {Object} action 表单按钮数据
     * @returns void
     */
    const onFormAction = (action: ActionItem) => {
      const { type, onClick } = action;

      // 如果自定义了onClick，则执行onClick自定义点击事件
      if (typeof onClick === "function") {
        onClick({
          formModel: formModel.value,
        });
        return;
      }

      // 表单默认提交
      if (type === "submit") {
        onFormSubmit();
        return;
      }

      // 表单默认重置
      if (type === "reset") onFormReset();

      /**
       * 表单按钮点击事件触发
       * @param {Object} options 回调参数，值为{type, formModel}
       */
      emit("on-action", {
        type,
        formModel: formModel.value,
      });
    };

    onMounted(() => {
      onGetFormInitInfo();
    });

    return {
      loading,
      formRef,
      formModel,
      formConfig,
      formGroup,
      onGetFormItemConfig,
      formActions,
      onGetFormInitInfo,
      onLoopFields,
      onInitFormDetail,
      onFormAction,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
