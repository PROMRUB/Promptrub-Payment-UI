import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePaymentMethodStore = defineStore('paymentMethodStore', () => {
  let msg = 'เลือกวิธีการชำระเงิน'
  let isShowModal = ref(false)
  let isShowLogo = ref(true)
  let isShowInformation = ref(false)
  let step = ref(1)
  let shopName = "ร้าน พ่อครัวเถื่อน ยอดนักตุ๋น"
  let qrimage = ""
  let total = "500.12"
  function updateMsg(newMsg) {
    this.msg = newMsg
  }

  function updateStep(newStep){
    this.step = newStep 
  }

  function toggleLogo() {
    this.isShowLogo = !this.isShowLogo
  }

  return { msg, step, isShowModal, isShowLogo, isShowInformation, shopName, qrimage, total, updateMsg, updateStep, toggleLogo }
})
