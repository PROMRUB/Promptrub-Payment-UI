<template>
    <main>
        <div class="prompt-content-header payment-method-header qr-code-header payment-method-divider">
            <label>{{ paymentMethodStore.shopName }}</label>
        </div>
        <img class="qr-code-image" :src="paymentMethodStore.qrImage" alt="QR Code" />
        <div class="prompt-content-header qr-code-content qr-suggestion-message" style="color:red;text-align:center;">
            <label for="refNoInput">สามารถกดค้างที่ QR Code</label><br>
            <label for="refNoInput">เพื่อบันทึกภาพ QR ในคลังรูป</label><br><br>
            <label style="color:red;text-align:center;">หลังจากนั้น นำภาพ QR ไปชำระในแอพธนาคาร</label>
        </div>
        <div class="prompt-content-header qr-code-content qr-suggestion-message">
            <label for="refNoInput">Ref# {{ paymentMethodStore.refNo }}</label>
        </div>
        <div class="prompt-content-header qr-align-center qr-code-header">
            <label>จำนวนเงิน (บาท)</label>
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
            const intervalId = setInterval(() => {
                this.paymentMethodStore.checkConfirmation(orgId, transactionId)
                    .then(() => {
                        if (this.paymentMethodStore.step == 4) {
                            clearInterval(intervalId);
                            this.$emit('selectedMethod', 4);
                        }
                    })
                    .catch(error => {
                        console.error('Failed to generate QR code:', error);
                    });
            }, 5000);
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
            link.href = this.paymentMethodStore.qrImage;
            link.download = 'QrImage.png';
            link.click();
        },
        onClickOpenMethod() {
            this.$emit('openModal');
        }
    }
};
</script>