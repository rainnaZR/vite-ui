<template>
  <div class="ht-tree f-unselect">
    <div v-for="(item, index) in list" :key="index">
      <div class="item f-df f-aic f-trans f-curp" @click.stop="onSpread(item)">
        <!-- 展开/收起 -->
        <ht-icon
          v-if="item.children && item.children.length"
          :class="[
            {
              'icon-spread': item.spread,
            },
            'f-mr5',
            'f-trans',
          ]"
          :data="{
            name: 'u-icon-arrowRight',
            style: { color: '#ccc' },
          }"
        />
        <!-- 选择框 -->
        <ht-icon
          v-if="data.showCheckbox"
          class="f-mr5"
          :data="{ name: 'u-icon-checkbox', style: { color: '#ccc' } }"
        />
        <!-- 标签插槽 -->
        <slot :label="item.label" depth="1">
          {{ item.label }}
        </slot>
      </div>

      <div
        v-if="item.children && item.children.length"
        class="f-trans f-oh"
        :style="{
          height: item.spread ? onGetHeight(item.children) : '0px',
        }"
      >
        <div
          v-for="(subItem, subIndex) in item.children"
          :key="`${index}-${subIndex}`"
        >
          <div
            class="item item-1 f-df f-aic f-trans f-curp"
            @click.stop="onSpread(subItem)"
          >
            <!-- 展开/收起 -->
            <ht-icon
              v-if="subItem.children && subItem.children.length"
              :class="[
                {
                  'icon-spread': subItem.spread,
                },
                'f-mr5',
                'f-trans',
              ]"
              :data="{
                name: 'u-icon-arrowRight',
                style: { color: '#ccc' },
              }"
            />
            <!-- 选择框 -->
            <ht-icon
              v-if="data.showCheckbox"
              class="f-mr5"
              :data="{ name: 'u-icon-checkbox', style: { color: '#ccc' } }"
            />
            <!-- 标签插槽 -->
            <slot :label="subItem.label" depth="2">
              {{ subItem.label }}
            </slot>
          </div>

          <div
            v-if="subItem.children && subItem.children.length"
            class="f-trans f-oh"
            :style="{
              height: subItem.spread ? onGetHeight(subItem.children) : '0px',
            }"
          >
            <div
              v-for="(subSubItem, subSubIndex) in subItem.children"
              :key="`${index}-${subIndex}-${subSubIndex}`"
            >
              <div
                class="item item-2 f-df f-aic f-trans f-curp"
                @click.stop="onSpread(subSubItem)"
              >
                <!-- 展开/收起 -->
                <ht-icon
                  v-if="subSubItem.children && subSubItem.children.length"
                  :class="[
                    {
                      'icon-spread': subSubItem.spread,
                    },
                    'f-mr5',
                    'f-trans',
                  ]"
                  :data="{
                    name: 'u-icon-arrowRight',
                    style: { color: '#ccc' },
                  }"
                />
                <!-- 选择框 -->
                <ht-icon
                  v-if="data.showCheckbox"
                  class="f-mr5"
                  :data="{ name: 'u-icon-checkbox', style: { color: '#ccc' } }"
                />
                <!-- 标签插槽 -->
                <slot :label="subSubItem.label" depth="3">
                  {{ subSubItem.label }}
                </slot>
              </div>

              <div
                v-if="subSubItem.children && subSubItem.children.length"
                class="f-trans f-oh"
                :style="{
                  height: subSubItem.spread
                    ? onGetHeight(subSubItem.children)
                    : '0px',
                }"
              >
                <div
                  v-for="(subSubSubItem, subSubSubIndex) in subSubItem.children"
                  :key="`${index}-${subIndex}-${subSubIndex}-${subSubSubIndex}`"
                >
                  <div
                    class="item item-3 f-df f-aic f-trans f-curp"
                    @click.stop="onSpread(subSubSubItem)"
                  >
                    <!-- 展开/收起 -->
                    <ht-icon
                      v-if="
                        subSubSubItem.children && subSubSubItem.children.length
                      "
                      :class="[
                        {
                          'icon-spread': subSubSubItem.spread,
                        },
                        'f-mr5',
                        'f-trans',
                      ]"
                      :data="{
                        name: 'u-icon-arrowRight',
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
                    <slot :label="subSubSubItem.label" depth="4">
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
import { defineComponent, PropType, reactive } from "vue";
import { TreeData, TreeItem } from "./types";

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

  setup(props, { emit }) {
    const onInitList = (data: TreeItem, depth: number, callback: Function) => {
      data.depth = depth;
      if (typeof data === "object") data = callback(data);
      data.children?.map((i: TreeItem) => onInitList(i, depth + 1, callback));
      return data;
    };
    const list = reactive(
      props.data.list?.map((i: TreeItem) =>
        onInitList(i, 1, (data: TreeItem) => ({
          ...data,
          spread: false,
        }))
      )
    );

    const onSpread = (item: TreeItem) => {
      item.spread = !item.spread;
    };
    const onGetHeight = () => {
      return "auto";
    };

    return {
      list,
      onSpread,
      onGetHeight,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
