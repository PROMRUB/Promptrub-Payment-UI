import { describe, it, expect } from 'vitest'

import { createApp } from 'vue';
import App from '../main.js';

describe('main.js', () => {
  it('renders without crashing', () => {
    const app = createApp(App);
    const vm = app.mount('#app');
    expect(vm).toBeFalsy();
  });
});