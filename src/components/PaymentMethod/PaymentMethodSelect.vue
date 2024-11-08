<script setup></script>

<template>
  <main>
    <div class="prompt-content-header payment-method-header">
      <label>เลือกช่องทางชำระเงิน</label>
    </div>
    <div class="payment-method-btn payment-method-disabled">
      <img class="method-icon" src="@/assets/images/mobile-icon.svg" alt="Mobile Icon" />
      <div class="method-text">
        <label class="payment-method-header payment-method-body">แอพธนาคาร (Mobile Banking)</label>
      </div>
      <img class="chevron-icon" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
    </div>
    <div class="payment-method-btn" @click="onClickSelectMethod(22)">
      <img class="method-icon" src="@/assets/images/qr-code-icon.svg" alt="QR Code Icon" />
      <div class="method-text">
        <label class="payment-method-header payment-method-body">พร้อมเพย์ (QR Code)</label>
      </div>
      <img class="chevron-icon" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
    </div>
    <div class="payment-method-btn payment-method-disabled">
      <img class="method-icon icon-disabled" src="@/assets/images/visa-icon.svg" alt="Visa Icon" />
      <img
        class="method-icon icon-disabled method-second-icon"
        src="@/assets/images/master-card-icon.svg"
        alt="Master Card Icon"
      />
      <div class="method-text method-second-icon">
        <label class="payment-method-header payment-method-body">บัตรเครดิต / เดบิต</label>
      </div>
      <img
        class="chevron-icon icon-disabled"
        src="@/assets/images/chevron-left.svg"
        alt="Chevron Left"
      />
    </div>
  </main>
</template>

<script>
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

export default {
  data() {
    return {
      paymentMethodStore: usePaymentMethodStore()
    }
  },
  methods: {
    generateQrCode() {
      const urlParams = new URLSearchParams(window.location.search)
      const orgId = urlParams.get('orgId')
      const transactionId = urlParams.get('transactionId')
      this.paymentMethodStore
        .checkConfirmation(orgId, transactionId)
        .then(() => {
          clearInterval(intervalId)
          this.$emit('selectedMethod', this.paymentMethodStore.step)
        })
        .catch((error) => {
          console.error('Failed to generate QR code:', error)
        })
    },
    onClickSelectMethod(value) {
      this.$emit('selectedMethod', value)
    }
  }
}
</script>
