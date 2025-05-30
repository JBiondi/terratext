import { renderHook } from '@testing-library/react';

import { useUniqueLetters } from './use-unique-letters';

describe('useUniqueLetters', () => {
  it('returns a set of unique letters excluding spaces', () => {
    const { result } = renderHook(() => useUniqueLetters('POLAR BEAR'));
    
    expect(result.current).toBeInstanceOf(Set);
    expect(result.current.size).toBe(7);
    expect(result.current.has('R')).toBe(true);
    expect(result.current.has(' ')).toBe(false);
  });
  
  it('recalculates when species name changes', () => {
    const { result, rerender } = renderHook(
      ({ name }) => useUniqueLetters(name),
      {
        initialProps: { name: 'IVORY GULL' }
      }
    );
    
    expect(result.current.size).toBe(8);    

    rerender({ name: 'MUSKOX' });
    
    expect(result.current.size).toBe(6);
  });
});