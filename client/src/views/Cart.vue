<template>
  <BasicLayout>
    <h1>Carrito</h1>
    <table class="ui celled table" v-if="products">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.price }}$</td>
          <td style="text-align:center">
            <i class="close icon" @click="deleteAllProductCart(product.id)"></i>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>Total</td>
          <td colspan="2">{{ getTotal() }}$</td>
        </tr>
      </tbody>
    </table>
    <button
      class="ui button primary fluid"
      @click="createOrder"
      v-if="products"
    >
      Generar Pedido
    </button>
    <h3 v-if="!products">NO TIENES PRODUCTOS EN EL CARRO</h3>
  </BasicLayout>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import jwtDecode from "jwt-decode";
import BasicLayout from "../Layout/BasicLayout.vue";
import {
  getProductsCartApi,
  deleteAllProductCartApi,
  deleteCartApi,
} from "../api/cart";
import { CreateOrderApi } from "../api/order";
import { getTokenApi } from "../api/token";
export default {
  name: "Cart",
  components: {
    BasicLayout,
  },
  setup() {
    let products = ref(null);
    let reloadCart = ref(false);
    const router = useRouter();
    watchEffect(async () => {
      reloadCart.value;
      const response = await getProductsCartApi();
      products.value = await response;
      reloadCart.value;
    });
    const getTotal = () => {
      let totalTemp = 0;
      products.value.forEach((product) => {
        totalTemp += product.price * product.quantity;
      });
      return totalTemp.toFixed(0);
    };
    const deleteAllProductCart = (idProduct) => {
      deleteAllProductCartApi(idProduct);
      reloadCart.value = !reloadCart.value;
    };
    const createOrder = async () => {
      const token = getTokenApi();
      const { id } = jwtDecode(token);
      console.log(id);
      const data = {
        user: id,
        totalPayment: getTotal(),
        data: products.value,
      };
      try {
        const response = await CreateOrderApi(data);
        deleteCartApi();
        router.push("/orders");
      } catch (error) {
        console.log(error);
      }
    };
    return {
      products,
      getTotal,
      deleteAllProductCart,
      createOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
i {
  right: 0;
}
i:hover {
  cursor: pointer;
}
</style>
