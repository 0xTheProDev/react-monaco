// @flow
import React from 'react';

type Props = {
  language: string,
  onChange: (ev: React.SyntheticEvent<HTMLSelectElement, React.ChangeEvent>) => void,
};

const LanguageOptions = ({ language, onChange }: Props) => (
  <React.Fragment>
    <label htmlFor='langOption' className='label'>Current Language:</label>
    <div className='select is-primary'>
      <select id='langOption' defaultValue={language} onChange={onChange}>
        <option value='c'>C</option>
        <option value='cpp'>C++</option>
        <option value='java'>Java</option>
        <option value='python'>Python</option>
      </select>
    </div>
  </React.Fragment>
);

export default LanguageOptions;
