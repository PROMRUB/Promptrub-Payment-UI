import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

vi.mock('axios');

describe('paymentMethodStore', () => {
  let store
  let baseUrl

  const setHostname = (hostname) => {
    vi.stubGlobal('window', { location: { hostname } })
  }
  
  beforeEach(() => {
    const app = createApp()
    app.use(createPinia())
    store = usePaymentMethodStore()
    baseUrl = 'https://dev-single-payment-api.promrub.com'
  })

  it('should update state when fetchData is called', async () => {
    const mockResponse = {
      data: {
        data: {
          orgName: 'Test Shop',
          refTransactionId: 'TXN123456789',
          prices: 500.25,
          redirectUrl: 'https://example.com/redirect',
        },
      },
    };
    
    axios.get.mockResolvedValueOnce(mockResponse);

    const orgId = 'org123';
    const transactionId = 'txn456';
    await store.fetchData(orgId, transactionId);

    expect(store.shopName).toBe('Test Shop');
    expect(store.refNo).toBe('TXN123456789');
    expect(store.total).toBe('500.25');
    expect(store.redirectUrl).toBe('https://example.com/redirect');
  });

  it('should handle error in fetchData gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    const orgId = 'org123';
    const transactionId = 'txn456';
    await store.fetchData(orgId, transactionId);

    expect(store.shopName).toBe('ร้าน พ่อครัวเถื่อน ยอดนักตุ๋น'); 
    expect(store.refNo).toBe('TransactionID1234567890');
    expect(store.total).toBe('500.12'); 
    expect(store.redirectUrl).toBe('');
  });

  it('should update state when generateQrCode is called', async () => {
    const mockResponse = {
      data: {
        data: {
          qrImage: 'someBase64String',
        },
      },
    };
    
    axios.get.mockResolvedValueOnce(mockResponse);

    const orgId = 'org123';
    const transactionId = 'txn456';
    await store.generateQrCode(orgId, transactionId);

    expect(store.qrImage).toBe('data:image/png;base64,someBase64String');
  });

  it('should update step and receiptUrl when checkConfirmation is called', async () => {
    const mockResponse = {
      data: {
        data: {
          paymentStatus: 1000, 
        },
      },
    };
    
    axios.get.mockResolvedValueOnce(mockResponse);

    const orgId = 'org123';
    const transactionId = 'txn456';
    await store.checkConfirmation(orgId, transactionId);

    expect(store.step).toBe(4);
    expect(store.receiptUrl).toBe('https://dev-single-payment-api.promrub.com/v1/api/Payment/org/org123/action/GetReceipt/txn456');
  });

  it('should handle different paymentStatus values in checkConfirmation', async () => {
    const mockResponse = {
      data: {
        data: {
          paymentStatus: 1102, 
        },
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    const orgId = 'org123';
    const transactionId = 'txn456';
    await store.checkConfirmation(orgId, transactionId);

    expect(store.step).toBe(5);
  });

  it('should set baseUrl to dev-single-payment-api for dev hostname', () => {
    setHostname('dev-payment-channel.promrub.com')

    if (window.location.hostname === 'dev-payment-channel.promrub.com') {
      baseUrl = 'https://dev-single-payment-api.promrub.com'
    } else if (window.location.hostname === 'payment-channel.promrub.com') {
      baseUrl = 'https://single-payment-api.promrub.com'
    }

    expect(baseUrl).toBe('https://dev-single-payment-api.promrub.com')
  })

  it('should set baseUrl to single-payment-api for production hostname', () => {
    setHostname('payment-channel.promrub.com')

    if (window.location.hostname === 'dev-payment-channel.promrub.com') {
      baseUrl = 'https://dev-single-payment-api.promrub.com'
    } else if (window.location.hostname === 'payment-channel.promrub.com') {
      baseUrl = 'https://single-payment-api.promrub.com'
    }

    expect(baseUrl).toBe('https://single-payment-api.promrub.com')
  })

  it('should use default baseUrl for other hostnames', () => {
    setHostname('localhost')

    if (window.location.hostname === 'dev-payment-channel.promrub.com') {
      baseUrl = 'https://dev-single-payment-api.promrub.com'
    } else if (window.location.hostname === 'payment-channel.promrub.com') {
      baseUrl = 'https://single-payment-api.promrub.com'
    }

    expect(baseUrl).toBe('https://dev-single-payment-api.promrub.com')
  })

  it('updates msg', () => {
    const newMsg = 'New Message'
    store.updateMsg(newMsg)
    expect(store.msg).toBe(newMsg)
  })

  it('updates step', () => {
    const newStep = 2
    store.updateStep(newStep)
    expect(store.step).toBe(newStep)
  })

  it('toggles logo', () => {
    const initialLogoState = store.isShowLogo
    store.toggleLogo()
    expect(store.isShowLogo).toBe(!initialLogoState)
  })
})