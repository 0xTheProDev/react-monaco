// @flow
import React from 'react';

type Props = {
  theme: string,
  onThemeChange: (ev: React.SyntheticEvent<HTMLSelectElement, React.ChangeEvent>) => void,
};

const ThemeOptions = ({ theme, onThemeChange }: Props) => (
  <React.Fragment>
    <label htmlFor='themeOption' className='label'>Current Theme:</label>
    <div className='select is-info'>
      <select id='themeOption' defaultValue={theme} onChange={onThemeChange}>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
        <option value='high-contrast'>High Contrast</option>
      </select>
    </div>
  </React.Fragment>
);

export default ThemeOptions;
