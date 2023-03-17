<template>
  <div>fecha</div>
  <div>
    <h3>Producto mas vendido</h3>
    <ul>
      <li>
        <comprasIcon />
        <h4>$12 456</h4>
        <h5>Total Ventas</h5>
      </li>
      <li>
        <comprasIcon />
        <h4>654654</h4>
        <h5>Ganancia</h5>
      </li>
      <li>
        <comprasIcon />
        <h4>199</h4>
        <h5>Unidades Vendidas</h5>
      </li>
    </ul>
  </div>

  <add-button @click="abrirModal" />
</template>

<script>
import comprasIcon from "../components/icons/comprasIcon.vue";
import addButton from "../components/addButton.vue";
import { Icon } from "@iconify/vue";
import { useProductStore } from "../stores/counter";
export default {
  components: {
    comprasIcon,
    Icon,
    addButton,
  },
  methods: {
    abrirModal() {
      useProductStore().toggleNewProductForm();
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  li {
    background: #003049;
    width: 60%;
    height: 130px;
    display: grid;
    place-items: center;
    color: white;
    border-radius: 4px;
    h4,
    h5 {
      margin: 0;
    }
  }
}
</style>