import { createApp } from 'vue'
import { createPinia, pinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PaymentMethod from '@/views/PaymentMethod.vue'
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

describe('PaymentMethod.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    const app = createApp()
    app.use(createPinia())
    store = usePaymentMethodStore()
    wrapper = mount(PaymentMethod, {
      global: {
        plugins: [app, pinia]
      }
    })
  })

  it('closes modal when onClickCloseModal is called', async () => {
    await wrapper.vm.onClickCloseModal()
    expect(store.isShowModal).toBe(false)
  })

  it('opens modal when onClickOpenModal is called', async () => {
    await wrapper.vm.onClickOpenModal()
    expect(store.isShowModal).toBe(true)
  })

  it('selects method when onClickSelectMethod is called', async () => {
    const value = 2
    await wrapper.vm.onClickSelectMethod(value)
    expect(store.step).toBe(value)
  })

  it('updates data and store state correctly when step is 1', async () => {
    store.step = 1
    wrapper = mount(PaymentMethod)
    expect(wrapper.vm.isShowShortBg).toBe(false)
    expect(wrapper.vm.isShowLongBg).toBe(true)
    expect(store.isShowLogo).toBe(true)
    expect(store.msg).toBe('เลือกวิธีการชำระเงิน')
    expect(wrapper.vm.isSelectMethodStep).toBe(true)
  })

  it('sets the correct data properties when paymentMethodStore.step is 21', async () => {
    store.step = 21
    wrapper = mount(PaymentMethod)

    expect(wrapper.vm.isShowShortBg).toBe(true)
    expect(wrapper.vm.isShowLongBg).toBe(false)
    expect(wrapper.vm.paymentMethodStore.isShowLogo).toBe(false)
    expect(wrapper.vm.paymentMethodStore.isShowInformation).toBe(true)
    expect(wrapper.vm.paymentMethodStore.msg).toBe('Mobile Banking')
    expect(wrapper.vm.isSelectMethodStep).toBe(false)
    expect(wrapper.vm.isMobileBankingStep).toBe(true)
  })

  it('sets the correct data properties when paymentMethodStore.step is 22', async () => {
    store.step = 22
    wrapper = mount(PaymentMethod)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isShowShortBg).toBe(false)
    expect(wrapper.vm.isShowLongBg).toBe(true)
    expect(wrapper.vm.paymentMethodStore.msg).toBe('ชำระเงินด้วย QR Code')
    expect(wrapper.vm.isSelectMethodStep).toBe(false)
    expect(wrapper.vm.isQRCodeStep).toBe(true)
  })

  it('sets the correct data properties when paymentMethodStore.step is 23', async () => {
    store.step = 23
    wrapper = mount(PaymentMethod)

    expect(wrapper.vm.isShowShortBg).toBe(true)
    expect(wrapper.vm.isShowLongBg).toBe(false)
    expect(wrapper.vm.paymentMethodStore.msg).toBe('Credit / Debit Card')
    expect(wrapper.vm.isSelectMethodStep).toBe(false)
    expect(wrapper.vm.isCardStep).toBe(true)
  })
})
