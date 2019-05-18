import { convertTheme } from '../src/util';

describe('Test convertTheme Utility', () => {
  it('should convert general purpose themes to monaco themes', () => {
    expect(convertTheme('light')).toBe('vs');
    expect(convertTheme('dark')).toBe('vs-dark');
    expect(convertTheme('high-contrast')).toBe('hc-black');
  });

  it('should fallback to given string in case of incompatibility', () => {
    expect(convertTheme('test')).toBe('test');
  });
});
