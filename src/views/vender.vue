<template>
  <div>28 Octubre 2021 | 17:30</div>
  <div class="container">
    <ul class="compras-ul">
      <li>Compras</li>
    </ul>
  </div>

  <ul>
    <li class="productos">
      <div class="vender-producto">
        <img src="../assets/img/toxiFondoBlanco.jpeg" alt="" />
      </div>
      <div class="product">
        <div class="nombre-producto">
          <h5>Gorra Flex-Fit</h5>
          <h6>$4.29</h6>
        </div>
        <div class="remove-add">
          <Icon icon="ic:baseline-remove-circle" width="30" height="30" />
          <h4>1</h4>
          <Icon
            icon="material-symbols:add-circle-rounded"
            width="30"
            height="30"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { Icon } from "@iconify/vue";
import addButton from "../components/addButton.vue";
import { useVentas } from "../stores/counter";
export default {
  components: {
    Icon,
    addButton,
  },
  methods: {
    openPedidoForm() {
      console.log("ASDasd");
      useVentas().tooglePedidoForm();
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 836px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.productos {
  display: flex;
}

.vender-producto {
  img {
    width: 140px;
  }
}

.product {
  display: grid;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.remove-add {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 30px;
}
</style>
