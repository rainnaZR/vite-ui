<script lang="ts">
import { defineComponent } from "vue";
import HtPopover from "../HtPopover/index.vue";

// 工具栏提示。
export default defineComponent({
  ...HtPopover,
  name: "HtTooltip",
  extendProps: {
    isTooltip: true,
  },
});
</script>
