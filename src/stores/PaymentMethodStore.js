import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePaymentMethodStore = defineStore('paymentMethodStore', () => {
  let msg = 'เลือกวิธีการชำระเงิน'
  let isShowModal = ref(false)
  let isShowLogo = ref(true)
  let isShowInformation = ref(false)
  let step = ref(1)
  let shopName = "ร้าน พ่อครัวเถื่อน ยอดนักตุ๋น"
  let qrImage = ""
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

  async function fetchData(orgId, transactionId) {
    try {
      const response = await axios.get(`https://localhost:44369/v1/api/Payment/org/${orgId}/action/GetPaymentDetails/${transactionId}`)
      this.shopName = response.data.data.orgName
      console.log(response.data.data.prices)
      this.total = response.data.data.prices.toString()
    } catch (error) {
      console.error(error)
    }
  }

  async function generateQrCode(orgId, transactionId) {
    try {
      console.log(this.orgId);
      const response = await axios.get(`https://localhost:44369/v1/api/Payment/org/${orgId}/action/GenerateQr30/${transactionId}`)
      this.qrImage = response.data.data.qrImage
    } catch (error) {
      console.error(error)
    }
  }

  return { msg, step, isShowModal, isShowLogo, isShowInformation, shopName, qrImage, total, updateMsg, updateStep, toggleLogo, fetchData, generateQrCode }
})
