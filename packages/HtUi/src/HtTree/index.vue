<template>
  <div class="ht-tree f-unselect">
    <div v-for="(item, index) in list" :key="index">
      <div class="item f-df f-aic f-trans f-curp" @click.stop="onSpread(item)">
        <!-- 展开/收起 -->
        <ht-icon
          :class="[
            { 'icon-hide': !item.children || !item.children.length },
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
          :class="[
            {
              'icon-disabled': item.disabled,
            },
            'f-mr5',
          ]"
          :data="{
            name: `${
              item.checked ? 'u-icon-checkboxCheck' : 'u-icon-checkbox'
            } `,
            style: {
              fontSize: '18px',
              color: `${item.checked && !item.disabled ? '#1677FF' : '#ccc'}`,
            },
          }"
          @click.stop="onCheck(item)"
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
              :class="[
                { 'icon-hide': !subItem.children || !subItem.children.length },
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
              :class="[
                {
                  'icon-disabled': subItem.disabled,
                },
                'f-mr5',
              ]"
              :data="{
                name: `${
                  subItem.checked ? 'u-icon-checkboxCheck' : 'u-icon-checkbox'
                } `,
                style: {
                  fontSize: '18px',
                  color: `${
                    subItem.checked && !subItem.disabled ? '#1677FF' : '#ccc'
                  }`,
                },
              }"
              @click.stop="onCheck(subItem)"
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
                  :class="[
                    {
                      'icon-hide':
                        !subSubItem.children || !subSubItem.children.length,
                    },
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
                  :class="[
                    {
                      'icon-disabled': subSubItem.disabled,
                    },
                    'f-mr5',
                  ]"
                  :data="{
                    name: `${
                      subSubItem.checked
                        ? 'u-icon-checkboxCheck'
                        : 'u-icon-checkbox'
                    } `,
                    style: {
                      fontSize: '18px',
                      color: `${
                        subSubItem.checked && !subSubItem.disabled
                          ? '#1677FF'
                          : '#ccc'
                      }`,
                    },
                  }"
                  @click.stop="onCheck(subSubItem)"
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
                      :class="[
                        {
                          'icon-hide':
                            !subSubSubItem.children ||
                            !subSubSubItem.children.length,
                        },
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
                      :class="[
                        {
                          'icon-disabled': subSubSubItem.disabled,
                        },
                        'f-mr5',
                      ]"
                      :data="{
                        name: `${
                          subSubSubItem.checked
                            ? 'u-icon-checkboxCheck'
                            : 'u-icon-checkbox'
                        } `,
                        style: {
                          fontSize: '18px',
                          color: `${
                            subSubSubItem.checked && !subSubSubItem.disabled
                              ? '#1677FF'
                              : '#ccc'
                          }`,
                        },
                      }"
                      @click.stop="onCheck(subSubSubItem)"
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
import { defineComponent, onMounted, PropType, reactive } from "vue";
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
    const onInitList = (data: TreeItem, options: any, callback: Function) => {
      data = {
        ...data,
        ...options,
      };
      callback(data);
      if (data.children) {
        data.children = data.children?.map((i: TreeItem, index: number) =>
          onInitList(
            i,
            {
              ...options,
              depth: options.depth + 1,
              parentId: data.id,
              indexArr: options.indexArr.concat(index),
            },
            callback
          )
        );
      }
      return data;
    };
    const onShowSpread = (data: TreeItem) => {
      if (data.spread !== undefined) return !!data.spread;
      const { spreadConfig, spreadDepth } = props.data;
      if (spreadConfig)
        return !!spreadConfig?.value?.includes(data[spreadConfig?.key || "id"]);
      return !spreadDepth || !!(data.depth && data.depth < spreadDepth);
    };
    const spreadList: TreeItem[] = reactive([]);
    const checkList: TreeItem[] = reactive([]);
    const list = reactive(
      props.data.list?.map((i: TreeItem, index: number) =>
        onInitList(i, { depth: 1, indexArr: [index] }, (data: TreeItem) => {
          data.spread = onShowSpread(data);
          if (data.spread) spreadList.push(data);
        })
      )
    );
    const onInitSpreadList = () => {
      if (!spreadList || !spreadList.length) return;
      spreadList.forEach((data: any) => {
        data.indexArr.reduce((item: TreeItem, index: number) => {
          item[index].spread = true;
          return item[index].children;
        }, list);
      });
    };

    const onSpread = (item: TreeItem) => {
      item.spread = !item.spread;
    };
    const onGetHeight = () => {
      return "auto";
    };
    const onCheck = (item: TreeItem) => {
      if (item.disabled) return;
      item.checked = !item.checked;
      const index = checkList.findIndex((i) => i.id === item.id);
      if (item.checked && index < 0) {
        checkList.push(item);
      } else if (!item.checked && index > -1) {
        checkList.splice(index, 1);
      }
      if (item.children && item.children.length > 0) {
        item.children.forEach((subItem) => onCheck(subItem));
      }
    };

    onMounted(() => {
      onInitSpreadList();
    });

    console.log(11, list);

    return {
      list,
      onSpread,
      onGetHeight,
      onInitSpreadList,
      onCheck,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
