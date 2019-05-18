// @flow
import React from 'react';

type Props = {
  options: {
    hideLineNumbers: boolean,
    hideMinimap: boolean,
    hideVerticalScrollbar: boolean,
    hideHorizontalScrollbar: boolean,
  },
  onOptionChange: (newOpt: Object) => void,
};

const EditorConfig = ({ options, onOptionChange }: Props) => (
  <div className='dropdown is-success is-hoverable'>
    <div className='dropdown-trigger'>
      <button className='button' aria-haspopup='true' aria-controls='dropdown-menu'>
        <span>Editor Settings</span>
      </button>
    </div>
    <div className='dropdown-menu' id='dropdown-menu' role='menu'>
      <div className='dropdown-content'>
        <div className='dropdown-item'>
          <label className='checkbox'>
            <input
              type='checkbox'
              checked={options.hideLineNumbers}
              onChange={() => onOptionChange({ hideLineNumbers: !options.hideLineNumbers })}
            />
            &nbsp;Hide Line Numbers
          </label>
        </div>
        <div className='dropdown-item'>
          <label className='checkbox'>
            <input
              type='checkbox'
              checked={options.hideMinimap}
              onChange={() => onOptionChange({ hideMinimap: !options.hideMinimap })}
            />
            &nbsp;Hide Mini Map {options.hideLineNumbers}
          </label>
        </div>
        <hr className='dropdown-divider' />
        <div className='dropdown-item'>
          <label className='checkbox'>
            <input
              type='checkbox'
              checked={options.hideVerticalScrollbar}
              onChange={() => onOptionChange({ hideVerticalScrollbar: !options.hideVerticalScrollbar })}
            />
            &nbsp;Hide Vertical Scrollbar
          </label>
        </div>
        <div className='dropdown-item'>
          <label className='checkbox'>
            <input
              type='checkbox'
              checked={options.hideHorizontalScrollbar}
              onChange={() => onOptionChange({ hideHorizontalScrollbar: !options.hideHorizontalScrollbar })}
            />
            &nbsp;Hide Horizontal Scrollbar
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default EditorConfig;
