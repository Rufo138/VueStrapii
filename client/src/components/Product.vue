<template>
  <div class="ui card product">
    <div class="image">
      <img :src="API_URL + product.image.url" :alt="product.name" />
    </div>
    <div class="content">
      <div class="header">{{ product.name }}</div>
      <div class="description">{{ product.price }}$</div>
    </div>
    <div class="ui button primary" @click="addProductCart(product.id)">
      Comprar
    </div>
  </div>
</template>

<script>
import { API_URL } from "../utils/constants";
import { addProductCartApi } from "../api/cart";
export default {
  name: "Product",
  props: {
    product: Object,
  },
  setup(props) {
    const addProductCart = (idProduct) => {
      addProductCartApi(idProduct);
    };
    return {
      API_URL,
      addProductCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.card.product {
  border: 1px solid #5a96be;
}
.product {
  &:hover {
    .ui.button {
      min-height: 20px;
      padding: 0;
      margin: 0;
    }
    .image {
      filter: invert(1);
      transition: 0.5s;
    }
  }
  .ui.button {
    max-height: 0;
    min-height: 0;
    overflow: hidden;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: min-height 0.3s ease;
  }
}
</style>
