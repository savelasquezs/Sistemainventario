<template>
  <div class="sidebar">
    <div class="img-container">
      <img
        src="../assets/img/WhatsApp_Image_2023-03-17_at_11.10.00-removebg-preview.png"
        alt=""
      />
    </div>
    <div class="contenido">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

 <style lang="scss" scoped>
.sidebar {
  background: #fafafa;
  height: 100vh;
  width: 150px;
  position: fixed;
  img {
    width: 150px;
  }
}
</style>>

