import { render, screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import PaymentMethod from '@/views/PaymentMethod.vue';
import { usePaymentMethodStore } from '@/stores/paymentMethodStore';

vi.mock('@/stores/paymentMethodStore', () => ({
  usePaymentMethodStore: vi.fn(),
}));

describe('PaymentMethod Component', () => {
  it('renders correctly', async () => {
    const mockStore = {
      msg: 'Your Mocked Message',
      isShowLogo: true,
      updateMsg: vi.fn(),
      toggleLogo: vi.fn(),
    };

    usePaymentMethodStore.mockImplementation(() => mockStore);

    render(PaymentMethod);

    expect(screen.getByText('Your Mocked Message')).to.exist;
  });
});
