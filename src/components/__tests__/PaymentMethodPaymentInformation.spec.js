import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PaymentMethodPaymentInformation from '@/components/PaymentMethod/PaymentMethodPaymentInformation.vue'
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

describe('PaymentMethodPaymentInformation.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    const app = createApp()
    app.use(createPinia())
    store = usePaymentMethodStore()
    wrapper = mount(PaymentMethodPaymentInformation)
  })

  it('formats total value correctly on mounted', () => {
    store.total = '1234567.8910'
    wrapper = mount(PaymentMethodPaymentInformation)
    expect(wrapper.vm.rawValue).toBe('1234567.8910')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.89')
  })

  it('formats total value correctly on mounted', () => {
    store.total = '1234567'
    wrapper = mount(PaymentMethodPaymentInformation)
    expect(wrapper.vm.rawValue).toBe('1234567')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.00')
  })
})