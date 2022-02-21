<template>
  <div class="ht-form-page">
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
        v-for="(group, index) in data.group"
        :key="`group-${index}`"
        class="f-mb30"
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
        <ht-form-item
          v-for="(field, fieldIndex) in group.fields"
          :key="`field-${fieldIndex}`"
          :data="onGetFormItemConfig(field)"
        >
          <component
            v-if="field.type"
            v-model:modelValue="formModel[field.prop]"
            :is="`ht-${field.type}`"
            :data="field.itemProps"
            v-on="field.itemEvents"
          />
          <div v-else>{{ formModel[field.prop] }}</div>
        </ht-form-item>
      </div>

      <!-- 表单项操作按钮区 -->
      <ht-form-item>
        <ht-button
          v-for="(action, index) in formActions"
          :key="`action-${index}`"
          :data="{
            ...action,
            type: action.btnType,
          }"
          @click="onFormAction(action)"
        >
          {{ action.text }}
        </ht-button>
      </ht-form-item>
    </ht-form>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  reactive,
  computed,
  onMounted,
} from "vue";
import { FormData, FormContext, Model } from "../HtForm/types";
import { FormPageData, FieldItem, ActionItem, ApiItem } from "./types";

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
    // 表单项配置数据
    const onGetFormItemConfig = (field: FieldItem) => {
      const config = { ...field };
      config.itemProps && delete config.itemProps;
      config.itemEvents && delete config.itemEvents;
      return config;
    };
    // 表单操作行为初始化
    const onInitActions = (
      list: string[] | ActionItem[] = [],
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
        text: "提交",
        btnType: "primary",
      },
      reset: {
        text: "重置",
      },
      search: {
        text: "搜索",
        btnType: "primary",
      },
    });

    // 表单操作行为
    const formActions = computed(() =>
      onInitActions(props.data?.action, defaultActions)
    );

    const onLoopFields = (callback: any) => {
      props.data.group.forEach((group) => {
        group?.fields?.forEach((field) => callback && callback(field));
      });
    };

    // 初始化表单创建
    const onInitFormCreate = (createInfo: any) => {
      if (!createInfo) return;
      onLoopFields((field: FieldItem) => {
        if (field.prop && createInfo[field.prop]) {
          // 初始值设定
          if (["select", "radio", "checkbox"].includes(field.type)) {
            field.itemProps = {
              ...(field.itemProps || {}),
              options: createInfo[field.prop],
            };
          }
        }
      });
    };

    const onInitFormDetail = (formInfo: Model) => {
      formModel.value = {
        ...(formModel || {}),
        ...(formInfo || {}),
      };
    };

    // 初始获取表单数据
    const onGetFormInitInfo = async () => {
      const api: undefined | ApiItem = props.data?.api?.getForm;
      if (!api) return;

      const { xhr, getParams = () => {}, callback } = api;
      const params = getParams();
      let result = await xhr(params);
      if (typeof callback === "function") {
        result = callback(result);
      }
      const { createInfo, formInfo } = result?.data?.data || {};
      // 初始化表单创建
      onInitFormCreate(createInfo);
      // 初始化表单详情
      onInitFormDetail(formInfo);
      // hooks操作
      const { onAfterGetFormHooks } = props.data.hooks || {};
      onAfterGetFormHooks && onAfterGetFormHooks(formModel);
    };

    // 表单提交
    const onFormSubmit = () => {
      formRef.value?.onValidate().then(async ({ valid }) => {
        if (!valid) return;

        const params = { ...formModel };
        const { id } = props.data;
        id && (params.id = id);

        const { onFormValidateHooks, onBeforeSubmitHooks, onAfterSubmitHooks } =
          props.data?.hooks || {};
        // 表单外部验证
        const outerValid = onFormValidateHooks
          ? onFormValidateHooks(params)
          : true;
        if (!outerValid) return;

        // 表单提交前数据整理
        onBeforeSubmitHooks && onBeforeSubmitHooks(params); // 对象是引用数据，外部可直接修改

        // 获取接口配置
        // 如果存在id，则调用编辑接口；否则调用新增接口
        const api = id
          ? props.data?.api?.updateForm
          : props.data?.api?.postForm;
        if (!api) return;

        // 提交表单
        // todo: loading开始
        // ...
        const result = await api.xhr(params);
        // todo: loading结束
        // ...
        // 请求结果
        onAfterSubmitHooks && onAfterSubmitHooks(result);
      });
    };

    // 表单重置
    const onFormReset = () => {
      formRef.value?.onReset();
      // hooks操作
      const { onResetFormHooks } = props.data.hooks || {};
      onResetFormHooks && onResetFormHooks(formModel);
    };

    // 表单操作
    const onFormAction = (action: ActionItem) => {
      const { type, onClick } = action;
      // 如果自定义了onClick，则执行onClick自定义点击事件
      if (typeof onClick === "function") {
        onClick({
          formModel,
        });
        return;
      }

      // 表单默认提交
      if (type === "submit") onFormSubmit();

      // 表单默认重置
      if (type === "reset") onFormReset();

      emit("on-btn-click", {
        type,
        formModel,
      });
    };

    onMounted(() => {
      onGetFormInitInfo();
    });

    return {
      formRef,
      formModel,
      formConfig,
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
