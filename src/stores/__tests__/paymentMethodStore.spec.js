import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { describe, it, expect } from 'vitest';
import { usePaymentMethodStore } from '@/stores/paymentMethodStore';

const app = createApp();
app.use(createPinia());

app.config.globalProperties.$pinia = createPinia();

describe('usePaymentMethodStore', () => {
  it('should toggle logo visibility', () => {
    const store = usePaymentMethodStore();

    expect(store.isShowLogo).toBe(true);

    store.toggleLogo();

    expect(store.isShowLogo).toBe(false);

    store.toggleLogo();

    expect(store.isShowLogo).toBe(true);
  });

  it('should update message', () => {
    const store = usePaymentMethodStore();

    expect(store.msg).toBe('Your Message Here');

    const newMsg = 'New Message';
    store.updateMsg(newMsg);

    expect(store.msg).toBe(newMsg);
  });
});
