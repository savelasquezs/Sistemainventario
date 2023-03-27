<template>
  <div>Dashboard</div>
  <div class="container px-5">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          v-model="emailToAdmin"
        />
        <div id="emailHelp" class="form-text">
          Este correo se volverá admin.
        </div>
      </div>

      <button
        type="submit"
        @click.prevent="agregarAAdmins"
        class="btn btn-primary"
      >
        Convertir a Admin
      </button>
    </form>
  </div>
</template>

<script>
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/firebaseInit";
export default {
  data() {
    return {
      emailToAdmin: "",
    };
  },
  methods: {
    agregarAAdmins() {
      const addAdminRole = httpsCallable(functions, "addAdminRole");
      addAdminRole({ email: this.emailToAdmin }).then((result) => {
        console.log(result);
      });
      this.emailToAdmin = "";
    },
  },
};
</script>

<style scoped>
</style>