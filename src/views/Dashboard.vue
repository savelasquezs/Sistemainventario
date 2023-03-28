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
    <div class="dash-es" > 
      Estadisticas promedio 
      <Icon class="fic" icon="grommet-icons:configure" />
      <div class="boton">
        <button class="semana">Esta semana</button>
        <button class="mes">Este mes </button>
        <button class="ano">Este año</button>
      </div>
      <div class="icon-head">
        <img src="https://firebasestorage.googleapis.com/v0/b/inventario-b661a.appspot.com/o/icons8-kimono-96.png?alt=media&token=7715a748-795f-4614-861b-be0f6f6c944b" alt=""> <h1 class="ki">Kimono</h1>
        
      </div>
      <div class="estadisticas">
        <img src="../assets/img/th.jpg" alt="">
        <div>Camisas</div>
        <div>Kimono</div>
        <div>Tenis</div>
      </div>
    </div>
  </div>
</template>

<script>

import { Icon } from '@iconify/vue';
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/firebaseInit";
export default {
  data() {
    return {
      emailToAdmin: "",
    };
  },
  components:{
    Icon
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
.dash-es{
  font-size:25px;
  font-weight: bold;
  position: absolute;
  top:200px; left: 400px;
}
.fic{
  position: absolute;
  left: 400px;
  width: 30px;
  height: 30px;
}
.boton{
  padding: 30px;
  display: flex;
  gap: 15px;
  
  
}
.boton :nth-child(1){
  width: 180px;
  border-radius: 10px;
  border: none;
  color: rgb(14, 16, 130);
 
}
.boton :nth-child(2){
  width: 180px;
  border-radius: 10px;
  border: none;
  color: rgb(14, 16, 130);
}
.boton :nth-child(3){
  width: 180px;
  border-radius: 10px;
  border: none;
  color: rgb(14, 16, 130);
}
.icon-head{
  padding: 20px;
  width: 98px;
  height: 130px;
  display: flex;
  gap: 20px;
}
.ki{
  font-weight: 100;
  font-size:25px;
}
</style>