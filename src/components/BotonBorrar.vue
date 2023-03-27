<template>
  <Icon class="iconos" icon="bi:trash-fill" color="red" v-if="user.admin" />
</template>

<script>
import { Icon } from "@iconify/vue";
import { mapState } from "pinia";
import { useUtils } from "../stores/counter";

export default {
  components: {
    Icon,
  },
  computed: {
    ...mapState(useUtils, ["user"]),
  },
};
</script>

<style scoped>
</style>