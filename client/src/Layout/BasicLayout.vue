<template>
  <div class="BasicLayout">
    <Navbar />
    <div class="ui container">
      <slot />
    </div>
    <Cart />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Cart from "../components/cart/cart.vue";
export default {
  name: "BasicLayout",
  components: {
    Navbar,
    Cart,
  },
};
</script>
