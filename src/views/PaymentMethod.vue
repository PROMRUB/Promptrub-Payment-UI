<script setup>
import PaymentMethodSelect from '@/components/PaymentMethod/PaymentMethodSelect.vue';
import PaymentMethodMobileBanking from '@/components/PaymentMethod/PaymentMethodMobileBanking.vue';
import PaymentMethodPaymentInformation from '@/components/PaymentMethod/PaymentMethodPaymentInformation.vue';
import PaymentMethodQRCode from '@/components/PaymentMethod/PaymentMethodQRCode.vue';
import PaymentMethodSuccessful from '@/components/PaymentMethod/PaymentMethodSuccessful.vue';

const paymentMethodStore = usePaymentMethodStore();
</script>

<template style="text-align:center;">
  <Teleport to="body">
    <div id="modal" v-show="paymentMethodStore.isShowModal" class="modal">
      <img @click="onClickCloseModal" class="close-modal-icon" src="../assets/images/close-modal-icon.svg"
        alt="Close Modal Icon" />
      <p style="margin-top:50px;margin-left:47px">ท่านต้องการยกเลิกการชำระเงินหรือไม่</p>
      <div @click="onClickCancelConfirmed" class="accept-modal-btn">
        <label class="accept-modal-text">ยืนยัน</label>
      </div>
      <div @click="onClickCloseModal" class="cancel-modal-btn">
        <label class="accept-modal-text">ยกเลิก</label>
      </div>
    </div>
  </Teleport>

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
    <div v-show="paymentMethodStore.isShowInformation">
      <PaymentMethodPaymentInformation />
    </div>
  </div>
  <div v-show="isShowLongBg" :key="reactive" class="background-body">
    <div v-show="isSelectMethodStep">
      <PaymentMethodSelect @selectedMethod="onClickSelectMethod" />
    </div>
    <div v-show="isQRCodeStep">
      <PaymentMethodQRCode @openModal="onClickOpenModal" />
    </div>
    <div v-show="isCardStep">
      <PaymentMethodSuccessful />
    </div>
    <div v-show="isSuccessfulStep">
      <PaymentMethodSuccessful />
    </div>
  </div>
  <div v-show="isShowShortBg"  :key="reactive" class="background-body-short">
    <div v-show="isMobileBankingStep">
      <PaymentMethodMobileBanking @openModal="onClickOpenModal" />
    </div>
  </div>
</template>

<script>

import { usePaymentMethodStore } from '@/stores/paymentMethodStore'

export default {
  components: {
    PaymentMethodSelect,
    PaymentMethodMobileBanking,
    PaymentMethodQRCode,
    PaymentMethodSuccessful
  },
  data() {
    return {
      reactive: 0,
      isShowLongBg: true,
      isShowShortBg: false,
      isSelectMethodStep: true,
      isMobileBankingStep: false,
      isQRCodeStep: false,
      isCardStep: false,
      isSuccessfulStep: false,
      paymentMethodStore: usePaymentMethodStore()
    };
  },
  mounted() {
  },
  updated() {
    let vm = this;
    if (vm.paymentMethodStore.step == 1) {
      vm.isShowShortBg = false;
      vm.isShowLongBg = true;
      vm.paymentMethodStore.isShowLogo = true;
      vm.paymentMethodStore.msg = 'เลือกวิธีการชำระ'
      vm.isSelectMethodStep = true;
    }
    else if (vm.paymentMethodStore.step == 21) {
      vm.isShowShortBg = true;
      vm.isShowLongBg = false;
      vm.paymentMethodStore.isShowLogo = false;
      vm.paymentMethodStore.isShowInformation = true;
      vm.paymentMethodStore.msg = 'Mobile Banking'
      vm.isSelectMethodStep = false;
      vm.isMobileBankingStep = true;
    }
    else if (vm.paymentMethodStore.step == 22) {
      vm.isShowShortBg = false;
      vm.isShowLongBg = true;
      vm.paymentMethodStore.msg = 'ชำระเงินด้วย QR Code'
      vm.isSelectMethodStep = false;
      vm.isQRCodeStep = true;
    }
    else if (vm.paymentMethodStore.step == 23) {
      vm.isShowShortBg = false;
      vm.isShowLongBg = true;
      vm.paymentMethodStore.msg = 'Credit / Debit Card'
      vm.isSelectMethodStep = false;
      vm.isCardStep = true;
    }
    else if (vm.paymentMethodStore.step == 4) {
      vm.isShowShortBg = false;
      vm.isShowLongBg = true;
      vm.isSuccessfulStep = true;
      vm.isSelectMethodStep = false;
      vm.paymentMethodStore.msg = 'ชำระเงินสำเร็จ'
      setTimeout(() => {
        window.location.href = 'https://www.google.com'
      }, 15000);
    }
  },
  methods: {
    onClickCloseModal() {
      let vm = this;
      vm.paymentMethodStore.isShowModal = false
    },
    onClickOpenModal() {
      let vm = this;
      vm.paymentMethodStore.isShowModal = true
    },
    onClickCancelConfirmed() {
      window.location.href = 'https://www.google.com'
    },
    onClickSelectMethod(value) {
      let vm = this
      vm.reactive++
      vm.paymentMethodStore.step = value
    }
  }
};
</script>
