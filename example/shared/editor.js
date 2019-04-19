// @flow
import React, { Component } from 'react';

import MonacoEditor from '../../src';
import template from './template';

type Props = {};

type State = {
  language: string,
  code: string,
};

class EditorContainer extends Component<Props, State> {
  state = {
    language: 'c',
    code: template['c'],
  };

  onLanguageChange = (ev: React.SyntheticEvent<HTMLSelectElement, Event>) => {
    const newLang: string = ev.target.value;
    const code: string = template[newLang] || '';
    this.setState({ language: newLang, code });
  }

  onContentChange = (value: string) => {
    this.setState({ code: value });
  }

  render() {
    const { language, code } = this.state;
    const { onLanguageChange, onContentChange } = this;

    return (
      <React.Fragment>
        <section className='lang_options'>
          <select defaultValue={language} onChange={onLanguageChange}>
            <option value='c'>C</option>
            <option value='cpp'>C++</option>
            <option value='java'>Java</option>
            <option value='python'>Python</option>
          </select>
        </section>
        <main className='app_container'>
          <MonacoEditor
            height={800}
            width='100%'
            language={language}
            value={code}
            onContentChange={onContentChange}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default EditorContainer;
