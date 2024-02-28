<template>
    <main>
        <div class="prompt-content-header payment-method-header qr-code-header payment-method-divider">
            <label>{{ paymentMethodStore.shopName }}</label>
        </div>
        <img class="qr-code-image" :src="paymentMethodStore.qrImage" alt="QR Code" />
        <div class="prompt-content-header qr-code-content qr-suggestion-message">
            <label>Ref# {{ paymentMethodStore.refNo }}</label>
        </div>
        <div class="prompt-content-header qr-align-center qr-code-header">
            <label>เป็นจำนวนเงินทั้งสิ้น (บาท)</label>
        </div>
        <div class="prompt-content-header qr-align-center qr-code-header">
            <input class="qr-code-total" type="text" id="numericInput" v-model="formattedValue" disabled />
        </div>
        <div @click="onClickDownloadImage" class="save-btn">
            <label class="accept-text">บันทึก</label>
        </div>
        <div @click="onClickOpenMethod" class="cancel-btn">
            <label class="accept-text">ยกเลิก</label> 
        </div>
    </main>
</template>

<script>

import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'
import { formatCurrency } from '@/assets/utilities/util.js'

export default {
    components: {
    },
    data() {
        return {
            rawValue: "",
            formattedValue: "",
            paymentMethodStore: usePaymentMethodStore(),
        };
    },
    mounted() {
        this.formatValue(this.paymentMethodStore.total)
        this.generateQrCode()
    },
    updated() {
        this.formatValue(this.paymentMethodStore.total)
    },
    methods: {
        generateQrCode() {
            const urlParams = new URLSearchParams(window.location.search);
            const orgId = urlParams.get('orgId');
            const transactionId = urlParams.get('transactionId');
            this.paymentMethodStore.generateQrCode(orgId, transactionId);
        },
        handleInput(event) {
            this.formatValue(event.target.value)
        },
        formatValue(value) {
            this.rawValue = value
            this.formattedValue = formatCurrency(value)
        },
        onClickDownloadImage() {
            const link = document.createElement('a');
            link.href = this.imageSrc;
            link.download = 'QrImage.png';
            link.click();
        },
        onClickOpenMethod() {
            this.$emit('openModal');
        }
    }
};
</script>