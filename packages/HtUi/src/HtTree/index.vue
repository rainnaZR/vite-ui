<template>
  <div class="ht-tree">
    <div v-for="(item, index) in data.list" :key="index">
      <div class="item f-df f-aic f-trans f-curp">
        <!-- 展开/收起 -->
        <ht-icon
          class="f-mr5"
          :data="{ name: 'u-icon-arrowDown', style: { color: '#ccc' } }"
        />
        <!-- 选择框 -->
        <ht-icon
          v-if="data.showCheckbox"
          class="f-mr5"
          :data="{ name: 'u-icon-checkbox', style: { color: '#ccc' } }"
        />
        <!-- 标签插槽 -->
        <slot :label="item.label">
          {{ item.label }}
        </slot>
      </div>

      <div v-if="item.children">
        <div
          v-for="(subItem, subIndex) in item.children"
          :key="`${index}-${subIndex}`"
        >
          <div class="item item-1 f-df f-aic f-trans f-curp">
            <!-- 展开/收起 -->
            <ht-icon
              class="f-mr5"
              :data="{ name: 'u-icon-arrowDown', style: { color: '#ccc' } }"
            />
            <!-- 选择框 -->
            <ht-icon
              v-if="data.showCheckbox"
              class="f-mr5"
              :data="{ name: 'u-icon-checkbox', style: { color: '#ccc' } }"
            />
            <!-- 标签插槽 -->
            <slot :label="subItem.label">
              {{ subItem.label }}
            </slot>
          </div>

          <div v-if="subItem.children">
            <div
              v-for="(subSubItem, subSubIndex) in subItem.children"
              :key="`${index}-${subIndex}-${subSubIndex}`"
            >
              <div class="item item-2 f-df f-aic f-trans f-curp">
                <!-- 展开/收起 -->
                <ht-icon
                  class="f-mr5"
                  :data="{ name: 'u-icon-arrowDown', style: { color: '#ccc' } }"
                />
                <!-- 选择框 -->
                <ht-icon
                  v-if="data.showCheckbox"
                  class="f-mr5"
                  :data="{ name: 'u-icon-checkbox', style: { color: '#ccc' } }"
                />
                <!-- 标签插槽 -->
                <slot :label="subSubItem.label">{{ subSubItem.label }}</slot>
              </div>

              <div v-if="subSubItem.children">
                <div
                  v-for="(subSubSubItem, subSubSubIndex) in subSubItem.children"
                  :key="`${index}-${subIndex}-${subSubIndex}-${subSubSubIndex}`"
                >
                  <div class="item item-3 f-df f-aic f-trans f-curp">
                    <!-- 展开/收起 -->
                    <ht-icon
                      class="f-mr5"
                      :data="{
                        name: 'u-icon-arrowDown',
                        style: { color: '#ccc' },
                      }"
                    />
                    <!-- 选择框 -->
                    <ht-icon
                      v-if="data.showCheckbox"
                      class="f-mr5"
                      :data="{
                        name: 'u-icon-checkbox',
                        style: { color: '#ccc' },
                      }"
                    />
                    <!-- 标签插槽 -->
                    <slot :label="subSubSubItem.label">
                      {{ subSubSubItem.label }}
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TreeData } from "./types";

// 树状组件，列表数据以树状结构展示，可展开收起，也可选中。
export default defineComponent({
  name: "HtTree",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<TreeData>,
      required: true,
      default: () => ({
        list: [],
      }),
    },
  },

  setup(props, { emit }) {},
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
