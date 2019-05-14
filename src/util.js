// @flow
/**
 * Utility functions for Monaco Editor React Wrapper
 */

const themeMap = {
  'light': 'vs',
  'dark': 'vs-dark',
  'high-contrast': 'hc-black',
};

export function convertTheme(theme: string): string {
  if (themeMap.hasOwnProperty(theme)) {
    return themeMap[theme];
  }

  return theme;
};

export function noop(): void {};
