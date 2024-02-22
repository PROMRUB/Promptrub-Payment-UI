import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PaymentMethodSelect from '@/components/PaymentMethod/PaymentMethodSelect.vue'

describe('PaymentMethodSelect.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(PaymentMethodSelect)
  })

  it('emits selectedMethod event with value 22 when second button is clicked', async () => {
    const button = wrapper.findAll('.payment-method-btn')[1]
    await button.trigger('click')
    expect(wrapper.emitted().selectedMethod[0]).toEqual([22])
  })
})