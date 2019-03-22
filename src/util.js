// @flow
/**
 * Utility functions for Monaco Editor React Wrapper
 */
export const noop = (): void => {};

export const convertTheme = (theme: string): string => {
  if (theme === 'light') {
    return 'vs';
  }

  if (theme === 'dark') {
    return 'vs-dark';
  }

  if (theme === 'high-contrast') {
    return 'hc-black';
  }

  return theme;
};