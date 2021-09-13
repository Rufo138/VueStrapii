<template>
  <BasicLayout>
    <h1>Ultimos Productos</h1>
    <div class="ui grid">
      <div
        class="eight wide mobile five wide tablet three wide computer column"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import BasicLayout from "../Layout/BasicLayout.vue";
import { getProducts } from "../api/product";
import Product from "../components/Product.vue";
export default {
  name: "Home",
  components: {
    BasicLayout,
    Product,
  },
  setup() {
    let products = ref(null);
    onMounted(async () => {
      const response = await getProducts(20);
      products.value = response;
    });
    return {
      products,
    };
  },
};
</script>
<style>
body {
  text-align: center;
}
</style>
