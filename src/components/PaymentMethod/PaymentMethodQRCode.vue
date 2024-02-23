<template>
    <main>
        <div class="prompt-content-header payment-method-header qr-code-header payment-method-divider">
            <label>ยินดีรับชำระค่าสินค้าหรือบริการนี้</label>
        </div>
        <div class="prompt-content-header qr-code-content">
            <label>ให้แก่</label>
        </div>
        <div class="prompt-content-header qr-align-center qr-code-header qr-code-header-shopname">
            <label>{{ paymentMethodStore.shopName }}</label>
        </div>
        <img class="qr-code-image" :src="imageSrc" alt="QR Code" />
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
            imageSrc: "../../assets/images/qr-code.svg",
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
        this.generateQrCode()
    },
    methods: {
        generateQrCode() {
            const urlParams = new URLSearchParams(window.location.search);
            const orgId = urlParams.get('orgId');
            const transactionId = urlParams.get('transactionId');
            this.paymentMethodStore.generateQrCode(orgId, transactionId);
            this.imageSrc = "data:image/png;base64," + this.paymentMethodStore.qrImage;
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