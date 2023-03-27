<template>
  <ul class="menuContainer">
    <li v-if="user.admin">
      <dashboardIcon />
      <router-link to="/">
        <h5>Dashboard</h5>
      </router-link>
    </li>
    <li>
      <pedidoIcon />
      <router-link to="/pedidos">
        <h5>Pedidos</h5>
      </router-link>
    </li>
    <li>
      <Icon icon="arcticons:debtcalc" width="24" height="24" />
      <h5>Gastos</h5>
    </li>
    <li>
      <Icon icon="ph:bag-bold" width="24" height="24" />
      <router-link to="/productos">
        <h5>Productos</h5>
      </router-link>
    </li>
  </ul>
</template>

<script>
import dashboardIcon from "./icons/dashboardIcon.vue";
import pedidoIcon from "./icons/pedidoIcon.vue";
import { Icon } from "@iconify/vue";
import { mapState } from "pinia";
import { useUtils } from "../stores/counter";
export default {
  components: {
    dashboardIcon,
    pedidoIcon,
    Icon,
  },
  computed: {
    ...mapState(useUtils, ["user"]),
  },
};
</script>

<style scoped>
ul {
  display: grid;
  gap: 20px;
  justify-content: center;
  padding: 0;
}
li {
  list-style: none;
  display: grid;
  place-items: center;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 7px 15px;
}
</style>