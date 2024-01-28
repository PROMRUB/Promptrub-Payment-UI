import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import PaymentMethod from '@/views/PaymentMethod.vue'
import { usePaymentMethodStore } from '@/stores/paymentMethodStore'

vi.mock('@/stores/paymentMethodStore', () => ({
  usePaymentMethodStore: vi.fn()
}))

describe('PaymentMethod Component', () => {
  it('should set payment method list', async () => {
    const mockStore = {
      msg: 'เลือกวิธีการชำระ',
      isShowLogo: true,
      updateMsg: vi.fn(),
      toggleLogo: vi.fn()
    }

    usePaymentMethodStore.mockImplementation(() => mockStore)

    const wrapper = mount(PaymentMethod, {
      data() {
        return {
          paymentMethodStore: {
            step: 1
          }
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.paymentMethodStore.msg).toBe('เลือกวิธีการชำระ')
    expect(wrapper.vm.isSelectMethodStep).toBe(true)
  })

  it('should emit the selectedMethod mobile Banking event when a method is clicked', async () => {
    const mockStore = {
      msg: 'เลือกวิธีการชำระ',
      isShowLogo: true,
      updateMsg: vi.fn(),
      toggleLogo: vi.fn()
    }

    usePaymentMethodStore.mockImplementation(() => mockStore)

    const wrapper = mount(PaymentMethod)
    await wrapper.findAll('.payment-method-btn').at(0).trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.vm.$emit('selectedMethod', 21)
    expect(wrapper.emitted().selectedMethod).toBeTruthy()
    expect(wrapper.emitted().selectedMethod[0]).toEqual([21])
  })

  it('should emit the selectedMethod qr code event when a method is clicked', async () => {
    const mockStore = {
      msg: 'เลือกวิธีการชำระ',
      isShowLogo: true,
      updateMsg: vi.fn(),
      toggleLogo: vi.fn()
    }

    usePaymentMethodStore.mockImplementation(() => mockStore)

    const wrapper = mount(PaymentMethod)
    await wrapper.findAll('.payment-method-btn').at(1).trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.vm.$emit('selectedMethod', 22)
    expect(wrapper.emitted().selectedMethod).toBeTruthy()
    expect(wrapper.emitted().selectedMethod[0]).toEqual([22])
  })

  it('should emit the selectedMethod credit or debit card event when a method is clicked', async () => {
    const mockStore = {
      msg: 'เลือกวิธีการชำระ',
      isShowLogo: true,
      updateMsg: vi.fn(),
      toggleLogo: vi.fn()
    }

    usePaymentMethodStore.mockImplementation(() => mockStore)

    const wrapper = mount(PaymentMethod)
    await wrapper.findAll('.payment-method-btn').at(2).trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.vm.$emit('selectedMethod', 23)
    expect(wrapper.emitted().selectedMethod).toBeTruthy()
    expect(wrapper.emitted().selectedMethod[0]).toEqual([23])
  })

  it('should set message and navigate to callbacklink when step is 4', async () => {
    const mockStore = {
      msg: 'ชำระเงินสำเร็จ',
      isShowLogo: true,
      updateMsg: vi.fn(),
      toggleLogo: vi.fn()
    }

    usePaymentMethodStore.mockImplementation(() => mockStore)

    const url = 'https://www.google.com'

    const wrapper = mount(PaymentMethod, {
      data() {
        return {
          paymentMethodStore: {
            step: 4
          }
        }
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paymentMethodStore.msg).toBe('ชำระเงินสำเร็จ')

    await new Promise((resolve) => setTimeout(resolve, 15000))

    Object.defineProperty(window, 'location', {
      value: {
        href: url
      },
      writable: true
    })

    expect(window.location.href).toBe(url)
  }, 20000)
})
