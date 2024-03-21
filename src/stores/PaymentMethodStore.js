import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePaymentMethodStore = defineStore('paymentMethodStore', () => {
  let msg = 'เลือกวิธีการชำระเงิน'
  let isShowModal = ref(false)
  let isShowLogo = ref(true)
  let isShowInformation = ref(false)
  let step = ref(1)
  let shopName = ref("ร้าน พ่อครัวเถื่อน ยอดนักตุ๋น")
  let refNo = ref("TransactionID1234567890")
  let qrImage = ref("")
  let total = ref("500.12")
  let redirectUrl = ""
  let receiptUrl = ""

  let baseUrl = "https://localhost:44369"
  //let baseUrl = "https://dev-single-payment-api.promrub.com"

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
      const response = await axios.get(baseUrl+`/v1/api/Payment/org/${orgId}/action/GetPaymentDetails/${transactionId}`)
      this.shopName = response.data.data.orgName
      this.refNo = response.data.data.refTransactionId
      this.total = response.data.data.prices.toString()
      this.redirectUrl = response.data.data.redirectUrl
    } catch (error) {
      console.error(error)
    }
  }

  async function generateQrCode(orgId, transactionId) {
    try {
      const response = await axios.get(baseUrl+`/v1/api/Payment/org/${orgId}/action/GenerateQr30/${transactionId}`)
      this.qrImage = "data:image/png;base64," + response.data.data.qrImage
    } catch (error) {
      console.error(error)
    }
  }

  async function checkConfirmation(orgId, transactionId) {
    try {
      const response = await axios.get(baseUrl+`/v1/api/Payment/org/${orgId}/action/GetPaymentDetails/${transactionId}`)
      if(response.data.data.paymentStatus == 3)
      {
        this.step = 4
        this.receiptUrl = baseUrl + `/v1/api/Payment/org/${orgId}/action/GetReceipt/${transactionId}`
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return { msg, step, isShowModal, isShowLogo, isShowInformation, shopName, refNo, qrImage, total, redirectUrl, receiptUrl, updateMsg, updateStep, toggleLogo, fetchData, generateQrCode, checkConfirmation }
})
