<template>
    <main>
        <div class="prompt-content-header payment-method-header qr-code-header payment-method-divider">
            <label>ชำระสินค้าหรือบริการ</label>
        </div>
        <div class="prompt-content-header qr-code-content">
            <label>ชื่อร้านค้า</label>
        </div>
        <div style="padding-left: 30px;" class="prompt-content-header qr-code-header qr-code-header-shopname">
            <label>{{ paymentMethodStore.shopName }}</label>
        </div>
        <img class="qr-code-image" src="../../assets/images/qr-code.svg" alt="QR Code" />
        <div style="padding-left: 30px;" class="prompt-content-header qr-code-header">
            <label>ยอดชำระทั้งหมด</label>
        </div>
        <div style="padding-left: 30px;" class="prompt-content-header qr-code-header">
            <input class="qr-code-total" type="text" id="numericInput" v-model="formattedValue" disabled />
        </div>
        <div class="prompt-content-header qr-code-content" style="text-align: center;font-size: 14px;">
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
        let vm = this
        const inputValue = vm.paymentMethodStore.total.replace(/[^0-9.]/g, '');
        vm.formatValue(inputValue);
    },
    updated() {
    },
    methods: {
        handleInput(event) {
            let vm = this;
            const inputValue = event.target.value.replace(/[^0-9.]/g, '');
            vm.formatValue(inputValue);
        },
        onClickOpenMethod() {
            this.$emit('openModal');
        },
        formatValue(value) {
            let vm = this;
            const parts = value.split('.');
            const integerPart = parts[0].split('').reverse().join('').replace(/(\d{3})(?=\d)/g, '$1,').split('').reverse().join('');
            let decimalPart = parts[1] || '';
            decimalPart = decimalPart.length > 2 ? decimalPart.substring(0, 2) : decimalPart;
            const formattedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
            vm.rawValue = value;
            vm.formattedValue = formattedValue.concat(" บาท");
        }
    }
};
</script>