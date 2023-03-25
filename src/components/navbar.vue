<template>
  <div class="sidebar">
    <div class="img-container h-25">
      <img
        src="../assets/img/WhatsApp_Image_2023-03-17_at_11.10.00-removebg-preview.png"
        alt=""
      />
    </div>

    <div class="contenido d-grid align-content-between h-75">
      <slot />
      <div>
        <span role="button" class="float-end text-danger pb-3" @click="logout"
          ><Icon icon="circum:logout" />Cerrar Sesión
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useUtils } from "../stores/counter";
export default {
  components: {
    Icon,
  },
  methods: {
    logout() {
      useUtils().logout();
    },
  },
};
</script>

 <style lang="scss" scoped>
.sidebar {
  background: #fafafa;
  height: 100vh;
  width: 150px;
  position: fixed;
  img {
    width: 130px;
  }
}
</style>>

