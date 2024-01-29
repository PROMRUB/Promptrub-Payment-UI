<script setup>
</script>

<template>
    <main>
        <div id="modal" class="modal">
            <img @click="onClickCloseModal" class="close-modal-icon" src="../assets/images/close-modal-icon.svg"
                alt="Close Modal Icon" />
            <p style="margin-top:50px;margin-left:47px">ท่านต้องการยกเลิกการชำระเงินหรือไม่</p>
            <div @click="onClickCancelConfirmed" class="accept-modal-btn">
                <label class="accept-modal-text">ยืนยัน</label>
            </div>
            <div @click="onClickCloseModal" class="cancel-modal-btn">
                <label class="accept-modal-text">ยกเลิก</label>
            </div>
        </div>
    </main>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
        };
    },
    methods: {
        onClickCloseModal() {
            this.$emit('closeModal');
        },
        onClickCancelConfirmed() {
            this.$emit('cancelModal');
        }
    }
}
</script>@/stores/PaymentMethodStore