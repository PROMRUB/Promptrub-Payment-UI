<script setup>
import CancelModal from '@/components/Common/CancelModal.vue';

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
        <CancelModal @closeModal="onClickCloseModal" @cancelModal="onClickCancelConfirmed" />
      </div>
  </Teleport>

  <div>
    <label class="prompt-header">{{ paymentMethodStore.msg }}</label>
  </div>
  <div>
    <div v-show="paymentMethodStore.isShowInformation">
      <PaymentMethodPaymentInformation />
    </div>
  </div>
  <div style="text-align: start;">
    <div v-show="isShowLongBg" :key="reactive" class="background-body">
      <div v-show="isSelectMethodStep">
        <PaymentMethodSelect @selectedMethod="onClickSelectMethod" />
      </div>
      <div v-show="isQRCodeStep">
        <PaymentMethodQRCode @openModal="onClickOpenModal" />
      </div>
      <div v-show="isCardStep">
      </div>
      <div v-show="isSuccessfulStep">
        <PaymentMethodSuccessful />
      </div>
    </div>
    <div v-show="isShowShortBg" :key="reactive" class="background-body-short">
      <div v-show="isMobileBankingStep">
        <PaymentMethodMobileBanking @openModal="onClickOpenModal" />
      </div>
      <div v-show="isCardStep">
        <PaymentMethodMobileBanking @openModal="onClickOpenModal" />
      </div>
    </div>
  </div>
</template>

<script>

import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

export default {
  components: {
    CancelModal,
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
    this.updateComponent()
  },
  updated() {
    this.updateComponent()
  },
  methods: {
    updateComponent() {
      if (this.paymentMethodStore.step == 1) {
        const urlParams = new URLSearchParams(window.location.search);
        const orgId = urlParams.get('orgId');
        const transactionId = urlParams.get('transactionId');
        this.paymentMethodStore.fetchData(orgId, transactionId)
        this.isShowShortBg = false;
        this.isShowLongBg = true;
        this.paymentMethodStore.isShowLogo = true;
        this.paymentMethodStore.msg = 'เลือกวิธีการชำระเงิน'
        this.isSelectMethodStep = true;
      }
      else if (this.paymentMethodStore.step == 21) {
        this.isShowShortBg = true;
        this.isShowLongBg = false;
        this.paymentMethodStore.isShowLogo = false;
        this.paymentMethodStore.isShowInformation = true;
        this.paymentMethodStore.msg = 'Mobile Banking'
        this.isSelectMethodStep = false;
        this.isMobileBankingStep = true;
      }
      else if (this.paymentMethodStore.step == 22) {
        this.isShowShortBg = false;
        this.isShowLongBg = true;
        this.paymentMethodStore.msg = 'ชำระเงินด้วย QR Code'
        this.isSelectMethodStep = false;
        this.isQRCodeStep = true;
      }
      else if (this.paymentMethodStore.step == 23) {
        this.isShowShortBg = true;
        this.isShowLongBg = false;
        this.paymentMethodStore.msg = 'Credit / Debit Card'
        this.isSelectMethodStep = false;
        this.isCardStep = true;
      }
      else if (this.paymentMethodStore.step == 4) {
        this.isShowShortBg = false;
        this.isShowLongBg = true;
        this.isSuccessfulStep = true;
        this.isSelectMethodStep = false;
        this.paymentMethodStore.msg = 'ชำระเงินสำเร็จ'
        setTimeout(() => {
          window.location.href = 'https://www.google.com'
        }, 15000);
      }
    },
    onClickCloseModal() {
      console.log('close')
      this.paymentMethodStore.isShowModal = false
    },
    onClickOpenModal() {
      this.paymentMethodStore.isShowModal = true
    },
    onClickCancelConfirmed() {
      window.location.href = 'https://www.google.com'
    },
    onClickSelectMethod(value) {
      this.reactive++
      this.paymentMethodStore.step = value
    }
  }
};
</script>
