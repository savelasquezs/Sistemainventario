<template>
  <div class="add-container">
    <Icon
      icon="material-symbols:add-circle"
      color="green"
      width="50"
      height="50"
    />
  </div>
</template>
<style scoped>
.add-container {
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}
</style>
<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
};
</script>

