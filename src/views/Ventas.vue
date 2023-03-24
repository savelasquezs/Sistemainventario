<template>
  <div>28 Octubre 2021 | 17:30</div>
  <div class="container">
    <ul class="headerUl">
      <li>Pendiente</li>
      <li>Finalizado</li>
    </ul>

    <ul>
      <li class="container">
        <div class="container d-flex justify-content-between w-100">
          <h5>Order #240</h5>
          <h6>17:04</h6>
        </div>
        <div class="container d-flex justify-content-between">
          <h6>Numero de productos: 4</h6>
          <div class="d-flex justify-content-evenly w-50">
            <p>$30.000</p>
            <button class="btn btn-success buttonPagar">Pagar</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  selected: false,
};
</script>

<style scoped lang="scss">
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