<script lang="ts">
import { defineComponent } from "vue";
import HtRadio from "../HtRadio/index.vue";

// 表单中的多选框组件。
export default defineComponent({
  ...HtRadio,
  name: "HtCheckbox",
});
</script>
