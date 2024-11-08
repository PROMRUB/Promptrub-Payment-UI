import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PaymentMethodSelect from '@/components/PaymentMethod/PaymentMethodSelect.vue'
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

describe('PaymentMethodSelect.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    const app = createApp()
    app.use(createPinia())
    store = usePaymentMethodStore()
    store = usePaymentMethodStore();
    store.checkConfirmation = vi.fn().mockResolvedValue(true);
    window.location = {
      search: '?orgId=testOrg&transactionId=testTxn'
    };
    wrapper = mount(PaymentMethodSelect, {
      global: {
        plugins: [createPinia()],
      },
    });
  })

  it('call checkConfirmation ', async () => {
    store.checkConfirmation.mockResolvedValueOnce();
    const orgId = 'org123';
    const transactionId = 'txn456';

    wrapper.vm.generateQrCode()
    const intervalId = setInterval(() => {}, 1000);
    clearInterval(intervalId);

    wrapper.vm.$emit('selectedMethod', store.step);

    expect(wrapper.emitted().selectedMethod[0]).toEqual([store.step]);
  })

  it('emits selectedMethod event with value 22 when second button is clicked', async () => {
    const button = wrapper.findAll('.payment-method-btn')[1]
    await button.trigger('click')
    expect(wrapper.emitted().selectedMethod[0]).toEqual([22])
  })
})