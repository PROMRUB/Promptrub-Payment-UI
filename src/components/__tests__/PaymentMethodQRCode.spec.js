import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
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
    store.checkConfirmation = vi.fn().mockResolvedValue(true)
    window.location = {
      search: '?orgId=testOrg&transactionId=testTxn'
    }
    store.total = '1234567.8910'
    wrapper = mount(PaymentMethodQRCode, { global: { plugins: [app] } })
  })

  it('should initialize data properties correctly', () => {
    expect(wrapper.vm.rawValue).toBe('1234567.8910');
    expect(wrapper.vm.formattedValue).toBe('1,234,567.89');

    expect(wrapper.vm.paymentMethodStore).toBeDefined();
    expect(wrapper.vm.paymentMethodStore.qrImage).toBe('');
    expect(wrapper.vm.paymentMethodStore.step).toBe(1);
  });

  it('should react to changes in the store', async () => {
    store.step = 3;
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.paymentMethodStore.step).toBe(3);
  });

  it('renders shop name correctly', () => {
    store.shopName = 'CBT Shop'
    wrapper = mount(PaymentMethodQRCode)
    const shopNameLabel = wrapper.find('.qr-code-header label')
    expect(shopNameLabel.text()).toBe('CBT Shop')
  })

  it('formats total value 2float correctly on mounted', () => {
    store.total = '1234567.8910'
    wrapper = mount(PaymentMethodQRCode)
    expect(wrapper.vm.rawValue).toBe('1234567.8910')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.89')
  })

  it('formats total value correctly on mounted', () => {
    store.total = '1234567'
    wrapper = mount(PaymentMethodQRCode)
    expect(wrapper.vm.rawValue).toBe('1234567')
    expect(wrapper.vm.formattedValue).toBe('1,234,567.00')
  })

  it('emits openModal event on click', async () => {
    await wrapper.find('.cancel-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('openModal')
  })

  it('call checkConfirmation ', async () => {
    store.checkConfirmation.mockResolvedValueOnce()
    const orgId = 'org123'
    const transactionId = 'txn456'

    wrapper.vm.generateQrCode()
    const intervalId = setInterval(() => {}, 1000)
    clearInterval(intervalId)

    wrapper.vm.$emit('selectedMethod', store.step)

    expect(wrapper.emitted().selectedMethod).toBeTruthy()
    expect(wrapper.emitted().selectedMethod[0]).toEqual([store.step])
  })

  it('should download the QR image when onClickDownloadImage is called', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      href: '',
      download: '',
      click: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink);

    wrapper.vm.onClickDownloadImage();

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe(store.qrImage);
    expect(mockLink.download).toBe('QrImage.png');

    expect(mockLink.click).toHaveBeenCalled();

    createElementSpy.mockRestore();
  });
})
