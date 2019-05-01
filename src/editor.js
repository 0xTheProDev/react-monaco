// @flow
import React from 'react';
import classNames from 'classnames';

import * as monaco from 'monaco-editor';

import {
  noop,
  convertTheme,
} from './util';

export type IMonacoCodeEditorProps = {
  children?: React.ReactChild,
  disableScrollBeyondLastColumn?: boolean,
  disableScrollBeyondLastLine?: boolean,
  editorDidMount?: (editorInstance: monaco.editor.IStandaloneCodeEditor) => void,
  editorWillUnmount?: (editorInstance: monaco.editor.IStandaloneCodeEditor) => void,
  height: string | number,
  hideHorizontalScrollbar?: boolean,
  hideLineNumbers?: boolean,
  hideMinimap?: boolean,
  hideVerticalScrollbar?: boolean,
  language?: string,
  onContentChange?: (value: string, oldValue?: string, event?: monaco.editor.IModelContentChangedEvent) => void,
  onLanguageChange?: (language: string, oldLanguage?: string, event?: monaco.editor.IModelLanguageChangedEvent) => void,
  options?: monaco.editor.IEditorConstructionOptions,
  readOnly?: boolean,
  renderEOL?: boolean,
  theme?: 'light' | 'dark' | 'high-contrast' | string,
  value?: string,
  width: string | number,
  wrapperClass?: string,
};

/**
 * React Wrapper for Monaco Standalone Code Editor
 */
export class MonacoCodeEditor extends React.PureComponent<IMonacoCodeEditorProps> {
  editor: monaco.editor.IStandaloneCodeEditor;
  editorNode: React.RefObject<HTMLDivElement>;
  value: string;

  static defaultProps = {
    editorDidMount: noop,
    editorWillUnmount: noop,
    options: {},
    onContentChange: noop,
    onLanguageChange: noop,
  };

  constructor(props: IMonacoCodeEditorProps) {
    super(props);
    this.editor = null;
    this.editorNode = React.createRef();
    this.value = '';
  }

  componentDidMount() {
    this.initEditor();
  }

  componentDidUpdate(prevProps: IMonacoCodeEditorProps) {
    this.updateEditor(prevProps);
  }

  componentWillUnmount() {
    this.disposeEditor();
  }

  onLanguageChange = (event: monaco.editor.IModelLanguageChangedEvent): void => {
    const {
      onLanguageChange,
    } = this.props;

    const {
      oldLanguage,
      newLanguage,
    } = event;

    onLanguageChange(newLanguage, oldLanguage, event);
  }

  onContentChange = (event: monaco.editor.IModelContentChangedEvent): void => {
    const {
      onContentChange,
    } = this.props;

    const oldValue = this.value;
    this.value = this.editor.getValue();
    onContentChange(this.value, oldValue, event);
  }

  getEditorOptions(): monaco.editor.IEditorOptions {
    const {
      disableScrollBeyondLastColumn,
      disableScrollBeyondLastLine,
      hideHorizontalScrollbar,
      hideLineNumbers,
      hideMinimap,
      hideVerticalScrollbar,
      language,
      options,
      readOnly,
      renderEOL,
      theme,
      value,
    } = this.props;

    const editorOptions: monaco.editor.IEditorOptions = { ...options };

    editorOptions.lineNumbers = hideLineNumbers === true ? 'off' : true;
    editorOptions.minimap = editorOptions.minimap || {
      enabled: !(hideMinimap === true),
    };

    editorOptions.readOnly = (readOnly === true);
    editorOptions.renderFinalNewline = (renderEOL === true);

    editorOptions.scrollbar = editorOptions.scrollbar || {};
    editorOptions.scrollbar.horizontal = hideHorizontalScrollbar === true ? 'hidden' : 'auto';
    editorOptions.scrollbar.vertical = hideVerticalScrollbar === true ? 'hidden' : 'auto';

    editorOptions.scrollBeyondLastColumn = disableScrollBeyondLastColumn === true ? 0 : 5;
    editorOptions.scrollBeyondLastLine = !(disableScrollBeyondLastLine === true);

    if (language) {
      editorOptions.language = language;
    }

    if (value) {
      editorOptions.value = value;
      this.value = value;
    }

    if (theme) {
      editorOptions.theme = convertTheme(theme);
    }

    return editorOptions;
  }

  initEditor() {
    const {
      editorDidMount,
    } = this.props;

    const editorOptions: monaco.editor.IEditorConstructionOptions = this.getEditorOptions();
    this.editor = monaco.editor.create(this.editorNode.current, editorOptions);
    this.editor.onDidChangeModelContent(this.onContentChange);
    this.editor.onDidChangeModelLanguage(this.onLanguageChange);
    editorDidMount(this.editor);
  }

  updateEditor(prevProps: IMonacoCodeEditorProps) {
    const {
      language: oldLanguage,
      theme: oldTheme,
      value: oldValue,
    } = prevProps;

    const {
      editor,
      props,
    } = this;

    const {
      language,
      theme,
      value,
    } = props;

    const editorOptions: monaco.editor.IEditorOptions = this.getEditorOptions();
    if (Object.keys(editorOptions).length > 0) {
      this.editor.updateOptions(editorOptions);
    }

    if (language !== oldLanguage) {
      monaco.editor.setModelLanguage(editor.getModel(), language);
    }

    const modifiedTheme = convertTheme(theme);
    if (theme !== oldTheme || modifiedTheme !== oldTheme) {
      monaco.editor.setTheme(modifiedTheme);
    }

    if (value !== oldValue) {
      editor.setValue(value);
    }
  }

  disposeEditor() {
    const {
      editor,
      props,
    } = this;

    const {
      editorWillUnmount,
    } = props;

    if (editor) {
      editorWillUnmount(editor);
      setTimeout(() => editor.dispose(), 0);
    }
  }

  /**
   * To be used for Unit and Integration testing purpose only
   */
  getValue(): string {
    const {
      editor,
    } = this;

    this.value = editor.getValue();
    return this.value;
  }

  setValue(value: string): void {
    const {
      editor,
    } = this;

    editor.setValue(value);
    this.value = value;
  }

  render() {
    const {
      editorNode,
      props,
    } = this;

    const {
      children,
      height,
      width,
      wrapperClass,
    } = props;

    const style = {
      height: (typeof height === 'number' ? `${height}px` : height),
      width: (typeof width === 'number' ? `${width}px` : width),
    };

    return (
      <div className={classNames('monaco-editor-wrapper', wrapperClass)}>
        <div ref={editorNode} className='monaco-editor-container' style={style} />
        { children }
      </div>
    );
  }
}
