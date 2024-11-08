<template>
    <main>
        <div class="payment-information-card">
            <div class="payment-information-card-content">
                <img class="logo-imags-s" src="../../assets/images/logo.svg" alt="Logo Image">
                <div class="method-text">
                    <label class="payment-method-header payment-method-body">ชำระสินค้าหรือบริการ</label>
                </div>
                <div class=" payment-method-divider"></div>
                <div class="prompt-content-header payment-information-content">
                    <label>ชื่อร้านค้า</label>
                </div>
                <div class="payment-information-content-header qr-align-center ">
                    <label>{{ paymentMethodStore.shopName }}</label>
                </div>
                <div class="prompt-content-header payment-information-content">
                    <label>จำนวนเงินที่ต้องชำระ</label>
                </div>
                <div class="prompt-content-header qr-align-center qr-code-header">
                    <input class="information-total" type="text" id="numericInput" v-model="formattedValue" disabled />
                </div>
            </div>
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
        this.formatValue(this.paymentMethodStore.total)
    },
    methods: {
        handleInput(event) {
            this.formatValue(event.target.value)
        },
        formatValue(value) {
            this.rawValue = value
            this.formattedValue = formatCurrency(value)
        },
    }
}
</script>