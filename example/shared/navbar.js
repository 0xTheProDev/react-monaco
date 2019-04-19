// @flow
import React from 'react';

import LanguageOptions from './language';
import ThemeOptions from './theme';
import EditorConfig from './config';

type Props = {
  language: string,
  theme: string,
  options: Object,
  onLanguageChange: (ev: React.SyntheticEvent<HTMLSelectElement, React.ChangeEvent>) => void,
  onThemeChange: (ev: React.SyntheticEvent<HTMLSelectElement, React.ChangeEvent>) => void,
  onOptionChange: (newOpt: Object) => void,
};

const NavBar = ({ language, theme, options, onLanguageChange, onThemeChange, onOptionChange }: Props) => (
  <section className='section'>
    <div className='level'>
      <div className='level-left'>
        <div className='level-item'>
          <LanguageOptions language={language} onChange={onLanguageChange} />
        </div>
        <div className='level-item'>
          <ThemeOptions theme={theme} onThemeChange={onThemeChange} />
        </div>
      </div>
      <div className='level-right'>
        <div className='level-item'>
          <EditorConfig options={options} onOptionChange={onOptionChange} />
        </div>
      </div>
    </div>
  </section>
);

export default NavBar;
