import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePaymentMethodStore = defineStore('paymentMethodStore', () => {
  let msg = 'Your Message Here'
  let isShowLogo = ref(true)
  function updateMsg(newMsg) {
    this.msg = newMsg
  }

  function toggleLogo() {
    this.isShowLogo = !this.isShowLogo
  }

  return { msg, isShowLogo, updateMsg, toggleLogo }
})
