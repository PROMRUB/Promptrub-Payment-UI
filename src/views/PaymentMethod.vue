<script setup>
import { ref } from 'vue'

import PaymentMethodSelect from '@/components/PaymentMethod/PaymentMethodSelect.vue';
import PaymentMethodSuccessful from '@/components/PaymentMethod/PaymentMethodSuccessful.vue';

import { usePaymentMethodStore } from '../stores/paymentMethodStore';

const { msg, isShowLogo, toggleLogo } = usePaymentMethodStore();
const key = ref(0); // Add a key to force reactivity
</script>

<template style="text-align:center;">
  <button @click="toggleLogo">Toggle Logo</button>
  <div style="text-align: center;">
    <label class="prompt-header">{{ msg }}</label>
  </div>
  <div :key="key">
    <div v-show="isShowLogo">
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
</script>
