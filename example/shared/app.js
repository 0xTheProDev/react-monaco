// @flow
import React, { Component } from 'react';

import NavBar from './navbar';
import Editor from './editor';
import template from './template';

type Props = {};

type State = {
  language: string,
  code: string,
  theme: string,
  options: Object,
};

class App extends Component<Props, State> {
  state = {
    language: 'c',
    code: template['c'],
    theme: 'light',
    options: {},
  };

  onLanguageChange = (ev: React.SyntheticEvent<HTMLSelectElement, React.ChangeEvent>) => {
    const language: string = ev.target.value;
    const code: string = template[language] || '';
    this.setState({ language, code });
  };

  onContentChange = (code: string) => {
    this.setState({ code });
  };

  onThemeChange = (ev: React.SyntheticEvent<HTMLSelectElement, React.ChangeEvent>) => {
    const theme: string = ev.target.value;
    this.setState({ theme });
  }

  onOptionChange = (newOpt: Object) => {
    const { options: oldOpt } = this.state;
    this.setState({ options: { ...oldOpt, ...newOpt }});
  };

  render() {
    const {
      language,
      code,
      theme,
      options,
    } = this.state;

    const {
      onLanguageChange,
      onContentChange,
      onThemeChange,
      onOptionChange
    } = this;

    return (
      <React.Fragment>
        <NavBar
          language={language}
          theme={theme}
          options={options}
          onLanguageChange={onLanguageChange}
          onThemeChange={onThemeChange}
          onOptionChange={onOptionChange}
        />
        <Editor
          language={language}
          code={code}
          theme={theme}
          options={options}
          onContentChange={onContentChange}
        />
      </React.Fragment>
    );
  }
}

export default App;
