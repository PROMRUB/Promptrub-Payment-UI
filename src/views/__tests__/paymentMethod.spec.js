import { createApp } from 'vue'
import { createPinia } from 'pinia'
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
    wrapper = mount(PaymentMethod)
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
})
