import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePaymentMethodStore = defineStore('paymentMethodStore', {
  state: () => ({
    msg: 'Your Message Here',
    isShowLogo: ref(true),
    key: ref(0)
  }),
  actions: {
    updateMsg(newMsg) {
      this.msg = newMsg
    },
    toggleLogo() {
        console.log(this.isShowLogo);
      this.isShowLogo = !this.isShowLogo
      this.msg = 'Test'
      this.key += 1
    }
  }
})
