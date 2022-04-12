<template>
  <!-- 加载插槽 -->
  <slot v-if="loading" name="loading">
    <HtLoading />
  </slot>
  <div v-else-if="state.list && state.list.length" class="ht-tree f-unselect">
    <div v-for="(item, index) in state.list" :key="index">
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
              item.checked === 1
                ? 'u-icon-checkboxCheck'
                : item.checked === 2
                ? 'u-icon-checkboxHalfChecked'
                : item.disabled
                ? 'u-icon-checkboxDisabled'
                : 'u-icon-checkbox'
            } `,
            style: {
              fontSize: '18px',
              color: `${
                item.checked > 0 && !item.disabled ? '#1677FF' : '#ccc'
              }`,
            },
          }"
          @click.stop="onCheck(item)"
        />
        <!-- 标签插槽 -->
        <slot depth="1" :detail="item">
          {{ item.label }}
        </slot>
      </div>

      <div
        v-if="item.children && item.children.length"
        class="f-trans f-oh"
        :style="{
          height: item.spread ? 'auto' : '0px',
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
                  subItem.checked === 1
                    ? 'u-icon-checkboxCheck'
                    : subItem.checked === 2
                    ? 'u-icon-checkboxHalfChecked'
                    : subItem.disabled
                    ? 'u-icon-checkboxDisabled'
                    : 'u-icon-checkbox'
                } `,
                style: {
                  fontSize: '18px',
                  color: `${
                    subItem.checked > 0 && !subItem.disabled
                      ? '#1677FF'
                      : '#ccc'
                  }`,
                },
              }"
              @click.stop="onCheck(subItem)"
            />
            <!-- 标签插槽 -->
            <slot depth="2" :detail="subItem">
              {{ subItem.label }}
            </slot>
          </div>

          <div
            v-if="subItem.children && subItem.children.length"
            class="f-trans f-oh"
            :style="{
              height: subItem.spread ? 'auto' : '0px',
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
                      subSubItem.checked === 1
                        ? 'u-icon-checkboxCheck'
                        : subSubItem.checked === 2
                        ? 'u-icon-checkboxHalfChecked'
                        : subSubItem.disabled
                        ? 'u-icon-checkboxDisabled'
                        : 'u-icon-checkbox'
                    } `,
                    style: {
                      fontSize: '18px',
                      color: `${
                        subSubItem.checked > 0 && !subSubItem.disabled
                          ? '#1677FF'
                          : '#ccc'
                      }`,
                    },
                  }"
                  @click.stop="onCheck(subSubItem)"
                />
                <!-- 标签插槽 -->
                <slot depth="3" :detail="subSubItem">
                  {{ subSubItem.label }}
                </slot>
              </div>

              <div
                v-if="subSubItem.children && subSubItem.children.length"
                class="f-trans f-oh"
                :style="{
                  height: subSubItem.spread ? 'auto' : '0px',
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
                          subSubSubItem.checked === 1
                            ? 'u-icon-checkboxCheck'
                            : subSubSubItem.checked === 2
                            ? 'u-icon-checkboxHalfChecked'
                            : subSubSubItem.disabled
                            ? 'u-icon-checkboxDisabled'
                            : 'u-icon-checkbox'
                        } `,
                        style: {
                          fontSize: '18px',
                          color: `${
                            subSubSubItem.checked > 0 && !subSubSubItem.disabled
                              ? '#1677FF'
                              : '#ccc'
                          }`,
                        },
                      }"
                      @click.stop="onCheck(subSubSubItem)"
                    />
                    <!-- 标签插槽 -->
                    <slot depth="4" :detail="subSubSubItem">
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
  <!-- 空状态插槽 -->
  <slot v-else-if="!data.hideEmpty" name="empty">
    <HtEmpty />
  </slot>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  computed,
  watch,
} from "vue";
import HtLoading from "../HtLoading";
import HtEmpty from "../HtEmpty";
import { TreeData, TreeItem } from "./types";

// 树状组件，列表数据以树状结构展示，可展开收起，也可选中。
export default defineComponent({
  name: "HtTree",

  components: {
    HtLoading,
    HtEmpty,
  },

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
    const loading = computed(() => props.data.loading);
    const state: any = reactive({
      spreadList: [],
      checkedList: [],
      list: [],
    });

    /**
     * 判断节点是否展开
     * @param  {Object} data 树节点数据
     * @returns {Boolean} isSpread 节点是否展开，true展开/false不展开
     */
    const onIsSpread = (data: TreeItem) => {
      if (data.spread !== undefined) return !!data.spread;
      const { spreadConfig: { key, value, depth } = {} } = props.data;
      if (key && value) return !!value?.includes(data[key]);
      return !depth || !!(data.depth && data.depth < depth);
    };

    /**
     * 判断节点是否选中
     * @param  {Object} data 树节点数据
     * @returns {Number} checkedValue 节点选中值，1选中/0未选中
     */
    const onIsChecked = (data: TreeItem) => {
      if (data.checked !== undefined) return ~~data.checked;
      const { checkedConfig } = props.data;
      return ~~checkedConfig?.value?.includes(data[checkedConfig?.key || "id"]);
    };

    /**
     * 初始化列表
     * @param  {Object} data 树节点数据
     * @returns {Object} data 转换后的节点数据
     */
    const onInitList = (data: any) => {
      data.depth = data.depth || 1;
      data.spread = onIsSpread(data);
      data.checked = onIsChecked(data); // 有三个状态，0不选择，1选择，2部分选择
      if (data.spread) state.spreadList.push(data);
      if (data.checked === 1) state.checkedList.push(data);
      if (data.children) {
        data.children = data.children?.map((i: TreeItem, index: number) =>
          onInitList({
            ...i,
            depth: data.depth + 1,
            parentId: data.id,
            indexArr: data.indexArr.concat(index),
          })
        );
      }
      return data;
    };

    state.list = props.data.list?.map((i: TreeItem, index: number) =>
      onInitList({
        ...i,
        indexArr: [index],
      })
    );

    /**
     * 设置指定元素子节点的状态值
     * @param {Object} data 树节点数据
     * @param {Number} checkedValue 节点需要设置的状态值，1选中/2部分选中/0未选中
     * @returns void
     */
    const onSetChildrenCheckStatus = (data: TreeItem, checkedValue: number) => {
      data.checked = checkedValue;
      const index = state.checkedList.findIndex(
        (i: TreeItem) => i.id === data.id
      );
      if (checkedValue === 1 && index < 0) {
        state.checkedList.push(data);
      } else if (!checkedValue && index > -1) {
        state.checkedList.splice(index, 1);
      }
      data.children?.forEach((item) =>
        onSetChildrenCheckStatus(item, checkedValue)
      );
    };

    /**
     * 设置节点状态
     * @param {Object} data 树节点数据
     * @returns {Object} 节点的状态对象{all, none, allDisabled, half}
     */
    const getCheckStatus = (node: TreeItem[]) => {
      let all = true;
      let none = true;
      let allDisabled = true;
      for (let i = 0, j = node.length; i < j; i++) {
        const n = node[i];
        if (n.checked !== 1) {
          all = false;
        }
        if (n.checked === 1 || n.checked === 2) {
          none = false;
        }
        if (!n.disabled) allDisabled = false;
      }

      return { all, none, allDisabled, half: !all && !none };
    };

    /**
     * 设置指定元素父节点的状态值
     * @param {Object} data 树节点数据
     * @returns void
     */
    const onSetParentCheckStatus = (data: TreeItem) => {
      const { depth, indexArr } = data;
      if (!depth || depth === 1 || !indexArr) return;
      // 获得父级元素的索引值
      const nodeIndexArr: any[] = indexArr?.reduce(
        (result: any[], value: number, index: number) => {
          result.push((result[index - 1] || []).concat(value));
          return result;
        },
        []
      );
      // 遍历父级元素的索引值，设置父元素的状态
      nodeIndexArr.pop(); // 去掉最后一个元素，最后一个元素为当前选中元素
      nodeIndexArr.reverse().forEach((nodeIndex: number[]) => {
        const node = nodeIndex.reduce(
          (item: TreeItem, value: number, index: number) => {
            return index === nodeIndex.length - 1
              ? item[value]
              : item[value].children;
          },
          state.list
        );
        if (!node.children) return;
        const { all, half, none, allDisabled } = getCheckStatus(node.children);
        node.checked = all ? 1 : half ? 2 : none ? 0 : 0;
        node.disabled = node.disabled || allDisabled;
      });
    };

    /**
     * 更新当前元素在整个树中的状态值
     * @param {Object} data 树节点数据
     * @param {Number} checkedValue 节点需要设置的状态值，1选中/2部分选中/0未选中
     * @returns void
     */
    const onUpdateCheckStatus = (data: TreeItem, checkedValue: number) => {
      // 状态更新有两步：
      // 1. 向下查找更新子级的状态
      onSetChildrenCheckStatus(data, checkedValue);
      // 2. 向上查找更新父级以上的状态
      onSetParentCheckStatus(data);
    };

    /**
     * 节点展开
     * @param {Object} data 树节点数据
     * @returns void
     */
    const onSpread = (data: TreeItem) => {
      data.spread = !data.spread;
    };

    /**
     * 节点选中
     * @param {Object} data 树节点数据
     * @returns void
     */
    const onCheck = (data: TreeItem) => {
      if (data.disabled) return;
      onUpdateCheckStatus(data, !data.checked ? 1 : 0);

      /**
       * 节点选中事件触发
       * @param {Object} options 回调参数，值为{checkedList, allCheckedList}
       */
      emit("on-check", {
        checkedList: state.checkedList?.filter(
          (i: TreeItem) => !i.children?.length
        ),
        allCheckedList: state.checkedList,
      });
    };

    /**
     * 初始化树节点展开
     * @returns void
     */
    const onInitSpreadStatus = () => {
      state.spreadList?.forEach((data: any) => {
        data.indexArr?.reduce((item: TreeItem, index: number) => {
          item[index].spread = true;
          return item[index].children;
        }, state.list);
      });
    };

    /**
     * 初始化树节点选中状态
     * @returns void
     */
    const onInitCheckedStatus = () => {
      state.checkedList?.forEach((data: TreeItem) => {
        onUpdateCheckStatus(data, 1);
      });
    };

    /**
     * 取消树节点选中状态
     * @returns void
     */
    const onCancelCheck = () => {
      state.list?.forEach((data: TreeItem) => {
        onUpdateCheckStatus(data, 0);
      });
    };

    watch(
      () => props.data.list,
      (value) => {
        state.list = value?.map((i: TreeItem, index: number) =>
          onInitList({
            ...i,
            indexArr: [index],
          })
        );
      },
      {
        immediate: true,
      }
    );

    onMounted(() => {
      onInitSpreadStatus();
      onInitCheckedStatus();
    });

    return {
      loading,
      state,
      onInitSpreadStatus,
      onInitCheckedStatus,
      onSpread,
      onCheck,
      onCancelCheck,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
