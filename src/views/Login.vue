<template>
  <!-- Section: Design Block -->
  <section class="background-radial-gradient overflow-hidden mainSection">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          //este es un div que contiene una imagen
          <div class="">
            <img
              src="../assets/img/toxiFondoBlanco.jpeg"
              alt="logo"
              width="350px"
              class="justify-self-center logo"
            />
          </div>
          //un h1 con algunos estilos
          <h1
            class="my-5 display-5 fw-bold ls-tight"
            style="color: hsl(218, 81%, 95%)"
          >
            Toxiferate<br />
            <span style="color: hsl(218, 81%, 75%)"
              >Vistete y sientete mejor</span
            >
          </h1>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0 mt-lg-5 position-relative">
          <div
            id="radius-shape-1"
            class="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            class="position-absolute shadow-5-strong"
          ></div>

          <div class="card bg-glass">
            <div class="card-body px-4 py-5 px-md-5 opacity-100">
              <form>
                <!-- 2 column grid layout with text inputs for the first and last names -->

                <!-- Aqui el fragmento de codigo con el formulario -->
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    placeholder="Correo Electronico"
                    id="form3Example3"
                    class="form-control"
                    v-model="login_form.email"
                  />
                </div>

                <!-- contraseña  -->
                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4"
                    class="form-control"
                    placeholder="Contraseña"
                    v-model="login_form.password"
                  />
                </div>

                <!-- boton de enviar -->

                <button
                  type="submit"
                  class="btn btn-primary btn-block mb-4 float-end"
                  @click.prevent="login"
                >
                  Inicia Sesión
                </button>

                <!-- botones de inicio de sesion -->
              </form>
            </div>
            <div class="pb-3 px-3">
              <h5>
                No estas registrado?
                <span
                  class="text-primary"
                  role="button"
                  @click="router.push('/register')"
                  >Hazlo ahora mismo</span
                >
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Section: Design Block -->
</template>

<script>
// aqui se importan algunas rutas
import router from "../router/index.js";
import { useUtils } from "../stores/counter.js";

export default {
  data() {
    return {
      login_form: {},
      router: router,
    };
  },
  methods: {
    login() {
      useUtils().login(this.login_form);
    },
  },
};
</script>

//aqui la definicion de algunos estilos 
<style scoped>
section.mainSection {
  max-height: 100vh;
  height: 100vh;
  overflow: scroll;
}
img.logo {
  border-radius: 50%;
  opacity: 0.8;
}
.background-radial-gradient {
  background-color: hsl(218, 41%, 15%);
  background-image: radial-gradient(
      650px circle at 0% 0%,
      hsl(218, 41%, 35%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%
    ),
    radial-gradient(
      1250px circle at 100% 100%,
      hsl(218, 41%, 45%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%
    );
}

#radius-shape-1 {
  height: 220px;
  width: 220px;
  top: -60px;
  left: -130px;
  background: radial-gradient(#44006b, #ad1fff);
  overflow: hidden;
}

#radius-shape-2 {
  border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
  bottom: -60px;
  right: -110px;
  width: 300px;
  height: 300px;
  background: radial-gradient(#44006b, #ad1fff);
  overflow: hidden;
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(200px);
}
</style>