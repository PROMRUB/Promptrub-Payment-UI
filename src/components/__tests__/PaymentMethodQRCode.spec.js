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

  it('renders correctly', () => {
    const wrapper = mount(PaymentMethodQRCode)
    expect(wrapper.html()).toContain('ชำระสินค้าหรือบริการ')
  })

  it('renders shop name correctly', () => {
    store.shopName = 'CBT Shop'
    wrapper = mount(PaymentMethodQRCode)
    const shopNameLabel = wrapper.find('.qr-code-header-shopname label')
    expect(shopNameLabel.text()).toBe('CBT Shop')
  })

  it('formats total value 2float correctly on mounted', () => {
    store.total = '1234567.8910'
    wrapper = mount(PaymentMethodQRCode)
    expect(wrapper.vm.rawValue).toBe('1234567.8910')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.89 บาท')
  })

  it('formats total value correctly on mounted', () => {
    store.total = '1234567'
    wrapper = mount(PaymentMethodQRCode)
    expect(wrapper.vm.rawValue).toBe('1234567')
    expect(wrapper.vm.formattedValue).toBe('1,234,567 บาท')
  })

  it('emits openModal event on click', async () => {
    await wrapper.find('.cancel-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('openModal')
  })
})
