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
            <img class="method-icon icon-disabled method-second-icon" src="@/assets/images/master-card-icon.svg" alt="Master Card Icon" />
            <div class="method-text method-second-icon" >
                <label class="payment-method-header payment-method-body">บัตรเครดิต / เดบิต</label>
            </div>
            <img class="chevron-icon icon-disabled" src="@/assets/images/chevron-left.svg" alt="Chevron Left" />
        </div>
    </main>
</template>

<script>

export default {
    methods: {
        onClickSelectMethod(value) {
            this.$emit('selectedMethod', value);
        }
    }
};
</script>