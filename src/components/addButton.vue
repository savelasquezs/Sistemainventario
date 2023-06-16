<!--Define la estructura del componente-->
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
<!--:style scoped Contiene estilos CSS específicos del componente-->
<style scoped>
.add-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}
</style>
<!--Contiene la lógica del componente-->
<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
};
</script>

