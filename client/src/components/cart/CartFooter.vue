<template>
  <div class="cart-footer">
    <p>Total: {{ Total }}$</p>
    <router-link to="/cart">
      <button
        class="ui button primary fluid"
        @click="closeCart"
        v-if="Total > 1"
      >
        Comprar
      </button>
    </router-link>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  name: "CartFooter",
  props: {
    products: Array,
    closeCart: Function,
  },
  setup(props) {
    let Total = ref(0);
    watchEffect(() => {
      props.products;
      let totalTemp = 0;
      props.products.forEach((product) => {
        totalTemp += product.price * product.quantity;
      });
      Total.value = totalTemp.toFixed(2);
    });
    return {
      Total,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-footer {
  padding: 10px;
}
</style>
