<template>
  <BasicLayout>
    <div class="login ">
      <h2>Login de Usuario</h2>
      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <input
            type="text"
            placeholder="Nombre de usuario"
            minlength="6"
            maxlength="12"
            v-model="formData.identifier"
            :class="{ error: formError.identifier }"
            required
          />
        </div>
        <div class="field">
          <input
            type="password"
            placeholder="Contraseña"
            minlength="6"
            maxlength="12"
            v-model="formData.password"
            :class="{ error: formError.password }"
            required
          />
        </div>
        <button
          type="submit"
          class="ui button fluid primary"
          :class="{ loading }"
        >
          Login
        </button>
      </form>
      <router-link to="/registro">Crear Cuenta</router-link>
      <br />
      <router-link to="/recuperar">Recuperar Contraseña</router-link>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import * as Yup from "yup";
import BasicLayout from "../Layout/BasicLayout.vue";
import { loginApi } from "../api/user";
import { useRouter } from "vue-router";
import { setTokenApi, getTokenApi } from "../api/token";
export default {
  name: "Login",
  components: {
    BasicLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();
    onMounted(() => {
      if (token) return router.push("/");
    });

    const schemaForm = Yup.object().shape({
      identifier: Yup.string().required(true),
      password: Yup.string().required(true),
    });
    const login = async () => {
      formError.value = {};
      try {
        await schemaForm.validate(formData.value, { abortEarly: false });
        try {
          const response = await loginApi(formData.value);
          if (!response?.jwt) throw "El usuario o contraseña es incorrecto";
          console.log(response);
          setTokenApi(response.jwt);
          console.log("ok");
          router.push("/");
        } catch (error) {
          alert("El usuario o contraseña es incorrecto");
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
          alert("El usuario o contraseña es incorrecto");
        });
      }
    };
    return {
      formData,
      formError,
      loading,
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  > h2 {
    margin: 50px 0 30px 0;
  }
  .ui.form {
    max-width: 300px !important;
    margin: 0 auto;
    margin-bottom: 10px;
    input.error {
      border-color: rgb(255, 67, 67);
      background-color: #ffeded;
    }
  }
}
</style>
