<template>
  <div class="cart-header">
    <p>carrito</p>
    <i class="close icon" @click="closeCart" />
  </div>
</template>

<script>
export default {
  name: "CartHeader",
  props: {
    closeCart: Function,
  },
};
</script>

<style lang="scss" scoped>
.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  border-bottom: 1px solid rgba(51, 47, 47, 0.315);
  padding: 10px 20px;
  i {
    right: 0;
  }
  i:hover {
    cursor: pointer;
  }
}
</style>
