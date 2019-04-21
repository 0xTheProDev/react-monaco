import * as React from 'react';
import * as monaco from 'monaco-editor';

type IMonacoCodeEditorProps = {
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

export class MonacoCodeEditor extends React.PureComponent<IMonacoCodeEditorProps> {};

export default MonacoCodeEditor;
