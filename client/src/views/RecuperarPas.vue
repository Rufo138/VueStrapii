<template>
  <BasicLayout>
    <div class="recover">
      <h2>Login de Usuario</h2>
      <form class="ui form">
        <div class="field">
          <input type="email" placeholder="Email" />
        </div>
        <button type="submit" class="ui button fluid primary">
          Recuperar Password
        </button>
      </form>
      <router-link to="/registro">Crear Cuenta</router-link>
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from "../Layout/BasicLayout.vue";
export default {
  name: "RecuperarPas",
  components: {
    BasicLayout,
  },
};
</script>

<style lang="scss" scoped>
.recover {
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
