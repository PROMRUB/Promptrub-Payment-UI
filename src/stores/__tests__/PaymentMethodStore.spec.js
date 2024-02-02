import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

describe('paymentMethodStore', () => {
  let store

  beforeEach(() => {
    const app = createApp()
    app.use(createPinia())
    store = usePaymentMethodStore()
  })

  it('updates msg', () => {
    const newMsg = 'New Message'
    store.updateMsg(newMsg)
    expect(store.msg).toBe(newMsg)
  })

  it('updates step', () => {
    const newStep = 2
    store.updateStep(newStep)
    expect(store.step).toBe(newStep)
  })

  it('toggles logo', () => {
    const initialLogoState = store.isShowLogo
    store.toggleLogo()
    expect(store.isShowLogo).toBe(!initialLogoState)
  })
})