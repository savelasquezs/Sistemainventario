<template>
  <!-- seccion de diseño del bloque  -->
  <section class="background-radial-gradient mainSection">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <div class="">
            <img
              src="../assets/img/toxiFondoBlanco.jpeg"
              alt="logo"
              width="250px"
              class="justify-self-center logo"
            />
          </div>
          <h1
            class="my-5 display-5 fw-bold ls-tight"
            style="color: hsl(218, 81%, 95%)"
          >
            Toxiferate<br />
            <span style="color: hsl(218, 81%, 75%)"
              >Vistete y sientete mejor</span
            >
          </h1>
          <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
            Nos enorgullece ofrecer un excelente servicio al cliente y
            proporcionar una experiencia de compra sin problemas para nuestros
            valiosos clientes. Así que, ya sea que busques renovar tu
            guardarropa o simplemente actualizar tu estilo, tenemos todo lo que
            necesitas para lucir y sentirte lo mejor posible.
          </p>
          <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
            ¡Así que no esperes más! Regístrate hoy y únete a nuestra comunidad
            de moda para recibir descuentos exclusivos, actualizaciones sobre
            nuevas llegadas y mucho más.
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div
            id="radius-shape-1"
            class="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            class="position-absolute shadow-5-strong"
          ></div>

          <div class="card bg-glass">
            <div class="card-body px-4 py-5 px-md-5">
              <form>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input
                        type="text"
                        id="form3Example1"
                        class="form-control"
                        placeholder="Nombres"
                        v-model="register_form.name"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input
                        type="text"
                        id="form3Example2"
                        class="form-control"
                        placeholder="Apellidos"
                        v-model="register_form.lastName"
                      />
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    placeholder="Correo Electronico"
                    id="form3Example3"
                    class="form-control"
                    v-model="register_form.email"
                  />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4"
                    class="form-control"
                    placeholder="Contraseña"
                    v-model="register_form.password"
                  />
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example5"
                    class="form-control"
                    placeholder="Confirma Tu Contraseña"
                    v-model="register_form.password2"
                  />
                </div>

                <!-- Submit button -->
                <button
                  type="submit"
                  class="btn btn-primary btn-block mb-4 float-end"
                  @click.prevent="register"
                >
                  Registrate
                </button>

                <!-- Register buttons -->
              </form>
            </div>
            <div class="pb-3 px-3">
              <h5>
                Ya tienes cuenta?
                <span
                  class="text-primary"
                  role="button"
                  @click="router.push('/login')"
                  >Ingresa Aquí</span
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
import router from "../router/index.js";
import { useUtils } from "../stores/counter.js";

export default {
  data() {
    return {
      register_form: {},
      router,
    };
  },
  methods: {
    register() {
      useUtils().register(this.register_form);
    },
  },
};
</script>

<style scoped>
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
  backdrop-filter: saturate(200%) blur(25px);
}
</style>