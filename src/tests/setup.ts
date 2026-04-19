import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock fetch globally for component tests
global.fetch = vi.fn();

// Reset mocks between tests
beforeEach(() => {
	vi.resetAllMocks();
});
