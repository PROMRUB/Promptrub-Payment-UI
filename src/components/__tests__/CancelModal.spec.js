import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CancelModal from '@/components/Common/CancelModal.vue'

describe('CancelModal.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CancelModal)
  })

  it('emits CloseModal event when close button is clicked', async () => {
    const closeBtn = wrapper.find('.close-modal-icon')
    await closeBtn.trigger('click')
    expect(wrapper.emitted().closeModal).toBeTruthy()
  })

  it('emits CancelModal event when confirm button is clicked', async () => {
    const confirmBtn = wrapper.find('.accept-modal-btn')
    await confirmBtn.trigger('click')
    expect(wrapper.emitted().cancelModal).toBeTruthy()
  })

  it('emits CloseModal event when cancel button is clicked', async () => {
    const cancelBtn = wrapper.find('.cancel-modal-btn')
    await cancelBtn.trigger('click')
    expect(wrapper.emitted().closeModal).toBeTruthy()
  })
})