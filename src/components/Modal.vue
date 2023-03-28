<template>
  <div class="wrapper">
    <div class="modales">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-content: center;
  .modales {
    min-width: 400px;
    max-width: 90%;
    overflow-y: scroll;
    max-height: 90vh;
    background: #fafafa;
    padding: 30px;
    border-radius: 5px;
  }
}
</style>