import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PaymentMethodQRCode from '@/components/PaymentMethod/PaymentMethodQRCode.vue'
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

describe('PaymentMethodQRCode.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    const app = createApp()
    app.use(createPinia())
    store = usePaymentMethodStore()
    store.total = '1234567.8910 บาท'
    wrapper = mount(PaymentMethodQRCode, { global: { plugins: [app] } })
  })

  it('renders shop name correctly', () => {
    store.shopName = 'CBT Shop'
    wrapper = mount(PaymentMethodQRCode)
    const shopNameLabel = wrapper.find('.qr-code-header-shopname label')
    expect(shopNameLabel.text()).toBe('CBT Shop')
  })

  it('formats total value correctly on mounted', () => {
    expect(wrapper.vm.rawValue).toBe('1234567.8910')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.89 บาท')
  })

  it('formats input value correctly', async () => {
    const inputEvent = {
      target: {
        value: '9876543.210 บาท'
      }
    }
    await wrapper.vm.handleInput(inputEvent)
    expect(wrapper.vm.rawValue).toBe('9876543.210')
    expect(wrapper.vm.formattedValue).toBe('9,876,543.21 บาท')
  })

  it('emits openModal event on click', async () => {
    await wrapper.find('.cancel-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('openModal')
  })
})
