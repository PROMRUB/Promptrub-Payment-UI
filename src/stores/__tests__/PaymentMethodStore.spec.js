import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePaymentMethodStore } from '@/stores/PaymentMethodStore'

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