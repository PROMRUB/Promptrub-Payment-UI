<script setup>
import CancelModal from '@/components/Common/CancelModal.vue';

import PaymentMethodSelect from '@/components/PaymentMethod/PaymentMethodSelect.vue';
import PaymentMethodMobileBanking from '@/components/PaymentMethod/PaymentMethodMobileBanking.vue';
import PaymentMethodPaymentInformation from '@/components/PaymentMethod/PaymentMethodPaymentInformation.vue';
import PaymentMethodQRCode from '@/components/PaymentMethod/PaymentMethodQRCode.vue';
import PaymentMethodSuccessful from '@/components/PaymentMethod/PaymentMethodSuccessful.vue';
import PaymentMethodFailed from '@/components/PaymentMethod/PaymentMethodFailed.vue';


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
        <PaymentMethodQRCode @openModal="onClickOpenModal" @selectedMethod="onClickSelectMethod" />
      </div>
      <div v-show="isCardStep">
      </div>
      <div v-show="isSuccessfulStep">
        <PaymentMethodSuccessful />
      </div>
      <div v-show="isFailedStep">
        <PaymentMethodFailed />
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
    PaymentMethodSuccessful,
    PaymentMethodFailed
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
      isFailedStep: false,
      paymentMethodStore: usePaymentMethodStore(),
      hvReceipt: false
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
        this.isFailedStep = false;
        this.isSelectMethodStep = false;
        this.isQRCodeStep = false;
        this.paymentMethodStore.msg = 'ชำระเงินสำเร็จ'
        if (this.hvReceipt == false) {
          const link = document.createElement('a');
          link.href = this.paymentMethodStore.receiptUrl;
          link.download = 'receipt.pdf';
          link.click();
          this.hvReceipt = true
        }
        setTimeout(() => {
          window.location.href = this.paymentMethodStore.redirectUrl
        }, 15000);
      }
      else if (this.paymentMethodStore.step == 5) {
        this.isShowShortBg = false;
        this.isShowLongBg = true;
        this.isSuccessfulStep = false;
        this.isFailedStep = true;
        this.isSelectMethodStep = false;
        this.isQRCodeStep = false;
        this.paymentMethodStore.msg = 'ชำระเงินล้มเหลว'
        setTimeout(() => {
          window.location.href = this.paymentMethodStore.redirectUrl
        }, 15000);
      }
      console.log(this.paymentMethodStore.step);
    },
    onClickCloseModal() {
      this.paymentMethodStore.isShowModal = false
    },
    onClickOpenModal() {
      this.paymentMethodStore.isShowModal = true
    },
    onClickCancelConfirmed() {
      window.location.href = this.paymentMethodStore.redirectUrl
    },
    onClickSelectMethod(value) {
      this.reactive++
      this.paymentMethodStore.step = value
    }
  }
};
</script>
