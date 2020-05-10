<template>
  <q-page padding>
    <div class="row q-col-gutter-md justify-center">
      <!-- <q-btn v-else color="negative" flat label="Salir" @click="onLogout" /> -->
      <div class="col-12 col-sm-8 col-md-5 col-lg-4 col-xl-3">
        <q-form v-if="!loggedIn" @submit.prevent="onSubmit" class="col-12 q-pa-md items-start q-gutter-md">
          <q-card dark class="my-card">
            <q-card-section bgcolor="secondary">
              <div class="text-h4" style="text-align: center;">{{form[0]}}</div>
            </q-card-section>
            <q-card-actions vertical align="center">
              <!-- <q-btn icon="fab fa-facebook" color="blue" style="width: 300px" label="Facebook" @click="logInFacebook" />
 -->
            </q-card-actions>
            <q-card-section class="row justify-center">
              <div>
                <q-input dark style="width: 300px; margin: auto" outlined bottom-slots v-model="formData.email" label="Correo">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div>
                <q-input dark style="width: 300px; margin: auto" outlined bottom-slots v-model="formData.password" label="Contraseña" :type="password?'password':'text'">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-btn round flat icon="visibility" @click="password = !password" />
                  </template>
                </q-input>
              </div>
            </q-card-section>
            <q-card-actions vertical align="center">
              <q-btn color="secondary" style="width: 300px" type="submit" :label="form[1]" />
              <q-btn color="secondary" style="width: 300px" size="sm" flat :label="form[2]" @click="formType=!formType" />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      formData: { email: "bolivaristadiego@gmail.com", password: "nicolas93" },
      formType: true,
      password: true
    };
  },
  computed: {
    form() {
      if (this.formType) {
        return ["Iniciar Sesion", "Ingresar", "Crea una cuenta"];
      } else {
        return ["Nueva Cuenta", "Registrarse", "¿Tienes una cuenta?"];
      }
    },
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["loginUser", "registerUser", "logInFacebook"]),
    onSubmit() {
      if (this.formType) {
        this.loginUser(this.formData)
          .then(result => {
            this.notify("Bienvenido", "positive", "green");
          })
          .catch(err => {
            this.notify(err, "negative", "red");
          });
      } else {
        this.registerUser(this.formData)
          .then(result => {
            this.notify("Registro exitoso", "positive", "green");
          })
          .catch(err => {
            console.log(err)
            this.notify(err, "negative", "red");
          });
      }
    },
    notify(msg, type, color) {
      this.$q.notify({
        position: "bottom-left",
        type,
        color,
        closeBtn: "x",
        message: msg,
        timeout: 3000
      });
    },
    onLogInFacebook() {
      this.logInFacebook()
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
};

</script>
<style lang="scss" scoped>
</style>
