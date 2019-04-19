// @flow
import React from 'react';

import MonacoEditor from '../../src';

type Props = {
  language: string,
  code: string,
  theme: string,
  options: Object,
  onContentChange: (value: string) => void,
};

const Editor = ({ language, code, theme, options, onContentChange }: Props) => (
  <main className='tile is-ancestor'>
    <div className='tile is-parent'>
      <article className='tile is-child box'>
        <MonacoEditor
          {...{
            ...options,
            height: 400,
            width: '100%',
            value: code,
            language,
            onContentChange,
            theme
          }}
        />
      </article>
    </div>
  </main>
);

export default Editor;
