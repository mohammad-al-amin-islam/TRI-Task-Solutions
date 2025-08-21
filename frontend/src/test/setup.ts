import '@testing-library/jest-dom';

// Mock timers to prevent issues with debounced functions
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});