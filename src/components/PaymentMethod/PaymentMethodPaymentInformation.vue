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
                <div style="padding-left: 30px;" class="payment-information-content-header">
                    <label>{{ paymentMethodStore.shopName }}</label>
                </div>
                <div class="prompt-content-header payment-information-content">
                    <label>จำนวนเงินที่ต้องชำระ</label>
                </div>
                <div style="padding-left: 30px;" class="prompt-content-header qr-code-header">
                    <input class="information-total" type="text" id="numericInput" v-model="formattedValue" disabled />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'
export default {
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
    methods: {
        handleInput(event) {
            let vm = this;
            const inputValue = event.target.value.replace(/[^0-9.]/g, '');
            vm.formatValue(inputValue);
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
}
</script>