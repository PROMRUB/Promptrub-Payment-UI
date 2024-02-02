<template>
    <main>
        <div class="prompt-content-header payment-method-header qr-code-header payment-method-divider">
            <label>ชำระสินค้าหรือบริการ</label>
        </div>
        <div class="prompt-content-header qr-code-content">
            <label>ชื่อร้านค้า</label>
        </div>
        <div class="prompt-content-header qr-align-center qr-code-header qr-code-header-shopname">
            <label>{{ paymentMethodStore.shopName }}</label>
        </div>
        <img class="qr-code-image" src="../../assets/images/qr-code.svg" alt="QR Code" />
        <div class="prompt-content-header qr-align-center qr-code-header">
            <label>ยอดชำระทั้งหมด</label>
        </div>
        <div class="prompt-content-header qr-align-center qr-code-header">
            <input class="qr-code-total" type="text" id="numericInput" v-model="formattedValue" disabled />
        </div>
        <div class="prompt-content-header qr-code-content qr-suggestion-message">
            <label>แสกนคิวอาร์โค้ดนี้ด้วยแอปพลิเคชั่นของธนาคารใดๆ</label>
        </div>
        <div class="save-btn">
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
    },
    updated() {
    },
    methods: {
        handleInput(event) {
            this.formatValue(event.target.value)
        },
        formatValue(value) {
            this.rawValue = value
            this.formattedValue = formatCurrency(value)
        },
        onClickOpenMethod() {
            this.$emit('openModal');
        }
    }
};
</script>