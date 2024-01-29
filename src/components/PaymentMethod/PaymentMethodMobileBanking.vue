<script setup>
</script>

<template>
    <main>
        <div class="prompt-content-header payment-method-header">
            <label>กรุณาเลือกธนาคาร</label>
        </div>
        <div class="payment-method-btn">
            <img class="method-icon" src="@/assets/images/scb-icon.svg" alt="SCB Icon" />
            <div class="method-text">
                <label class="payment-method-header payment-method-body">ธนาคารไทยพาณิชย์</label>
            </div>
            <img class="chevron-icon" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
        </div>
        <div class="payment-method-btn">
            <img class="method-icon" src="@/assets/images/kbank-icon.svg" alt="KBank Icon" />
            <div class="method-text">
                <label class="payment-method-header payment-method-body">ธนาคารกสิกร</label>
            </div>
            <img class="chevron-icon" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
        </div>
        <div class="payment-method-btn">
            <img class="method-icon" src="@/assets/images/bbl-icon.svg" alt="BBL Icon" />
            <div class="method-text">
                <label class="payment-method-header payment-method-body">ธนาคารกรุงเทพฯ</label>
            </div>
            <img class="chevron-icon" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
        </div>
        <div class="payment-method-btn">
            <img class="method-icon" src="@/assets/images/ayb-icon.svg" alt="AYB Icon" />
            <div class="method-text">
                <label class="payment-method-header payment-method-body">ธนาคารอยุธยา</label>
            </div>
            <img class="chevron-icon" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
        </div>
        <div class="payment-method-btn">
            <img class="method-icon" src="@/assets/images/gsb-icon.svg" alt="GSB Icon" />
            <div class="method-text">
                <label class="payment-method-header payment-method-body">ธนาคารออมสิน</label>
            </div>
            <img class="chevron-icon" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
        </div>
        <div @click="onClickOpenMethod" class="cancel-btn-xl" >
            <label class="accept-text-xl">ยกเลิก</label>
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
        const parts = inputValue.split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        let decimalPart = parts[1] || '';
        decimalPart = decimalPart.length > 2 ? decimalPart.substring(0, 2) : decimalPart;
        const formattedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
        vm.rawValue = inputValue;
        vm.formattedValue = formattedValue.concat(" บาท");
    },
    updated() {
    },
    methods: {
        handleInput(event) {
            const inputValue = event.target.value.replace(/[^0-9.]/g, '');
            const parts = inputValue.split('.');
            const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            let decimalPart = parts[1] || '';
            decimalPart = decimalPart.length > 2 ? decimalPart.substring(0, 2) : decimalPart;
            const formattedValue = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
            this.rawValue = inputValue;
            this.formattedValue = formattedValue.concat(" บาท");
        },
        onClickOpenMethod() {
            this.$emit('openModal');
        }
    }
};
</script>