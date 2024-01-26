<script setup>
import PaymentMethodSelect from '@/components/PaymentMethod/PaymentMethodSelect.vue';
import PaymentMethodSuccessful from '@/components/PaymentMethod/PaymentMethodSuccessful.vue';

const paymentMethodStore = usePaymentMethodStore();
</script>

<template style="text-align:center;">
  <label class="prompt-header">{{ paymentMethodStore.msg }}</label>
  <div>
    <div v-show="paymentMethodStore.isShowLogo">
      <img class="logo-image" src="../assets/images/logo.svg" alt="Logo Image">
      <img class="background-image1" src="../assets/images/background-1.svg" alt="background Image 1">
      <img class="background-image2" src="../assets/images/background-2.svg" alt="background Image 2">
      <img class="coin-image1" src="../assets/images/coin-1.svg" alt="coin Image 1">
      <img class="coin-image2" src="../assets/images/coin-2.svg" alt="coin Image 2">
      <img class="coin-image3" src="../assets/images/coin-3.svg" alt="coin Image 3">
    </div>
  </div>
  <div class="background-body">
    <PaymentMethodSelect />
    <PaymentMethodSuccessful />
  </div>
</template>

<script>

import { usePaymentMethodStore } from '@/stores/paymentMethodStore';

export default {
  data() {
    return {
      paymentMethodStore: usePaymentMethodStore(),
    };
  },
  mounted() {
  },
  updated() {
  },
  methods: {
  }
};
</script>
