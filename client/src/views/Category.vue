<template>
  <BasicLayout>
    <div class="ui grid">
      <div
        class="sixten wide mobile five wide tablet three wide computer column"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getProductsCategory } from "../api/product";
import Product from "../components/Product.vue";
import BasicLayout from "../Layout/BasicLayout.vue";
export default {
  name: "Category",
  components: {
    BasicLayout,
    Product,
  },
  watch: {
    $route(to, from) {
      this.getProducts(to.params.category);
    },
  },
  setup() {
    let products = ref(null);
    const { params } = useRoute();
    onMounted(() => {
      getProducts(params.category);
    });
    const getProducts = async (category) => {
      const response = await getProductsCategory(category);
      products.value = response;
    };
    return { getProducts, products };
  },
};
</script>

<style></style>
