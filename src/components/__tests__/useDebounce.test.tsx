import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import useDebounce from '../useDebounce';

// Helper component to test the hook
const TestComponent = ({ value, delay }: { value: string; delay: number }) => {
  const debouncedValue = useDebounce(value, delay);
  return <div data-testid="debounced-value">{debouncedValue}</div>;
};

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'changed', delay: 500 });
    
    // Value should still be the old one immediately
    expect(result.current).toBe('initial');
    
    // Fast forward time by 400ms (less than delay)
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    // Value should still be the old one
    expect(result.current).toBe('initial');
    
    // Fast forward time by 100ms more (total 500ms)
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Now the value should be updated
    expect(result.current).toBe('changed');
  });

  it('should cancel previous timeout when value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change value multiple times rapidly
    rerender({ value: 'first', delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    rerender({ value: 'second', delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    rerender({ value: 'final', delay: 500 });
    
    // Value should still be initial
    expect(result.current).toBe('initial');
    
    // Fast forward to after the delay
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Should only show the final value
    expect(result.current).toBe('final');
  });

  it('should work with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 1000 } }
    );

    rerender({ value: 'changed', delay: 1000 });
    
    // After 500ms, should still be initial
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');
    
    // After 1000ms, should be changed
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('changed');
  });

  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 0 } }
    );

    rerender({ value: 'changed', delay: 0 });
    
    // With zero delay, should update on next tick
    act(() => {
      jest.runOnlyPendingTimers();
    });
    
    expect(result.current).toBe('changed');
  });

  it('should handle empty string values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    rerender({ value: '', delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe('');
  });

  it('should handle special characters and unicode', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    const specialValue = 'тест 🚀 @#$%^&*()';
    rerender({ value: specialValue, delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe(specialValue);
  });

  it('should work with very long strings', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    const longString = 'a'.repeat(10000);
    rerender({ value: longString, delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(result.current).toBe(longString);
  });

  it('should handle multiple rapid changes correctly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 100 } }
    );

    // Simulate rapid typing
    const values = ['i', 'in', 'ini', 'init', 'initi', 'initia', 'initial'];
    
    values.forEach((value, index) => {
      rerender({ value, delay: 100 });
      
      if (index < values.length - 1) {
        act(() => {
          jest.advanceTimersByTime(50); // Less than delay
        });
      }
    });
    
    // Should still show initial value
    expect(result.current).toBe('initial');
    
    // Wait for the delay
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Should show the last value
    expect(result.current).toBe('initial');
  });

  it('should cleanup timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = renderHook(() => useDebounce('test', 500));
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });
}); 