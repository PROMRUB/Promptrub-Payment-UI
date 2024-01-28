<script setup>
</script>

<template>
    <main>
        <div class="prompt-content-header payment-method-header">
            <label>เลือกช่องทางชำระเงิน</label>
        </div>
        <div class="payment-method-btn" @click="onClickSelectMethod(21)">
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
        <div class="payment-method-btn payment-method-disabled" @click="onClickSelectMethod(23)">
            <img class="method-icon icon-disabled" src="@/assets/images/visa-icon.svg" alt="Visa Icon" />
            <img class="method-icon icon-disabled" style="padding-left: 50px;" src="@/assets/images/master-card-icon.svg" alt="Master Card Icon" />
            <div class="method-text" style="padding-left: 50px;" >
                <label class="payment-method-header payment-method-body">บัตรเครดิต / เดบิต</label>
            </div>
            <img class="chevron-icon icon-disabled" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
        </div>
    </main>
</template>

<script>
import { usePaymentMethodStore } from '@/stores/paymentMethodStore';

export default {
    data() {
        return {
            paymentMethodStore: usePaymentMethodStore(),
        };
    },
    methods: {
        onClickSelectMethod(value) {
            this.$emit('selectedMethod', value);
        }
    }
};
</script>