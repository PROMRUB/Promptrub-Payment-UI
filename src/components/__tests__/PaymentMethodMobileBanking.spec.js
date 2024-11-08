import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PaymentMethodMobileBanking from '@/components/PaymentMethod/PaymentMethodMobileBanking.vue'

import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

describe('PaymentMethodMobileBanking.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    const app = createApp()
    app.use(createPinia())
    store = usePaymentMethodStore()
    wrapper = mount(PaymentMethodMobileBanking)
  })

  it('emits openModal event when cancel button is clicked', async () => {
    const cancelButton = wrapper.find('.cancel-btn-xl')
    await cancelButton.trigger('click')
    expect(wrapper.emitted().openModal).toBeTruthy()
  })

  it('formats total 2 float value correctly', () => {
    store.total = '1234567.8910'
    wrapper = mount(PaymentMethodMobileBanking)
    expect(wrapper.vm.rawValue).toBe('1234567.8910')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.89')
  })

  it('formats total value correctly', () => {
    store.total = '1234567'
    wrapper = mount(PaymentMethodMobileBanking)
    expect(wrapper.vm.rawValue).toBe('1234567')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.00')
  })

  it('formats input 2 float value correctly', async () => {
    const inputEvent = {
      target: {
        value: '1234567.8910'
      }
    }
    await wrapper.vm.handleInput(inputEvent)
    expect(wrapper.vm.rawValue).toBe('1234567.8910')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.89')
  })

  it('formats input value correctly', async () => {
    const inputEvent = {
      target: {
        value: '1234567'
      }
    }
    await wrapper.vm.handleInput(inputEvent)
    expect(wrapper.vm.rawValue).toBe('1234567')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.00')
  })
})
