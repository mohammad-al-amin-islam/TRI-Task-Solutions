import '@testing-library/jest-dom';

// Mock timers to prevent issues with debounced functions
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  try {
    vi.runOnlyPendingTimers();
  } catch {}
  vi.useRealTimers();
});