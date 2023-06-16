<!-- Define la estructura del componente-->
<template>
  <Icon class="iconos" icon="bi:trash-fill" color="red" v-if="user.admin" />
</template>
<!--Contiene la lógica del componente. En este caso, se importa el componente Icon de la biblioteca @iconify/vue y las funciones mapState y useUtils de las bibliotecas pinia y ../stores/counter respectivamente.-->
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
<!-- Contiene estilos CSS específicos del componente-->
<style scoped>
</style>