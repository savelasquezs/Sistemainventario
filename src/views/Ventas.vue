<template>
  <div>28 Octubre 2021 | 17:30</div>
  <div class="container">
    <ul class="headerUl">
      <li>Pendiente</li>
      <li>Finalizado</li>
    </ul>
    <div class="contenido">
      <ul>
        <li class="gasto">
          <div class="gasto-head">
            <h5>Order #240</h5>
            <h6>17:04</h6>
          </div>
          <div class="gasto-head">
            <h6>Numero de productos: 4</h6>
            <div class="gasto-detail">
              <p>$30.000</p>
              <button class="buttonPagar" @click="abrirDetalle">Pagar</button>
            </div>
          </div>
        </li>
      </ul>
      <OrderDetailVue v-if="edittingVentas" />
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import OrderDetailVue from "../components/OrderDetail.vue";
import { useProductStore, useVentas } from "../stores/counter";
export default {
  components: {
    OrderDetailVue,
  },
  computed: {
    ...mapState(useVentas, ["edittingVentas"]),
  },
  methods: {
    abrirDetalle() {
      useVentas().toogleEditVentas();
    },
  },
};
</script>

<style scoped lang="scss">
.contenido {
  display: grid;
  grid-auto-flow: column;
  gap: 50px;
}

.gasto {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 10px;
  gap: 20px;
  height: 100px;
  border-radius: 5px;
  min-width: 50vw;

  /* Dark Blue */

  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  &:hover {
    background: #003049;
    color: #ffff;
  }
}
.buttonPagar {
  background: #36cd1d;
  border-radius: 30px;
  padding: 5px 20px;
  border: none;
}
.gasto-detail {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 20px;
}
.gasto-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  width: 100%;
}
* {
  margin: 0;
  padding: 0;
}
li p {
  margin-right: 30px;
}
ul {
  list-style-type: none;
}
ul.headerUl {
  display: flex;
  justify-content: start;
  li {
    padding: 20px;
    margin: 10px;
    cursor: pointer;
  }
  .container {
    padding: 50px;
  }
  .btn.btn-success.buttonPagar {
    padding: 10px;
  }
}
</style>