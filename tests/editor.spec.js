import React from 'react';
import * as monaco from 'monaco-editor';

import { MonacoCodeEditor } from '../src/editor';

describe('Test Monaco Standalone Code Editor', () => {
  let
    editorCreateStub,
    editorSetModelLanguageStub,
    editorDisposeStub,
    editorInstanceStub,
    getModelStub,
    getValueStub,
    onContentChangeStub,
    onLanguageChangeStub,
    editorSetThemeStub,
    setValueStub,
    updateOptionsStub;

  beforeAll(() => {
    editorDisposeStub = jest.fn();
    getModelStub = jest.fn().mockReturnValue(null);
    getValueStub = jest.fn().mockReturnValue('Some sample code');
    setValueStub = jest.fn();
    updateOptionsStub = jest.fn();

    editorInstanceStub = {
      onDidChangeModelContent: (onContentChangeHandler) => {
        onContentChangeStub = onContentChangeHandler;
      },
      onDidChangeModelLanguage: (onLanguageChangeHandler) => {
        onLanguageChangeStub = onLanguageChangeHandler;
      },
      dispose: editorDisposeStub,
      getModel: getModelStub,
      getValue: getValueStub,
      setValue: setValueStub,
      updateOptions: updateOptionsStub,
    };

    editorCreateStub = jest.spyOn(monaco.editor, 'create').mockReturnValue(editorInstanceStub);
    editorSetModelLanguageStub = jest.spyOn(monaco.editor, 'setModelLanguage').mockImplementation();
    editorSetThemeStub = jest.spyOn(monaco.editor, 'setTheme');
  });

  afterAll(() => {
    editorCreateStub.mockRestore();
    editorSetModelLanguageStub.mockRestore();
  });

  afterEach(() => {
    editorCreateStub.mockClear();
    editorSetModelLanguageStub.mockClear();
    editorDisposeStub.mockClear();
    getModelStub.mockClear();
    getValueStub.mockClear();
    editorSetThemeStub.mockClear();
    setValueStub.mockClear();
    updateOptionsStub.mockClear();
  });

  test('should render Editor element after component mounts', () => {
    const editorDidMountStub = jest.fn();
    shallow(<MonacoCodeEditor editorDidMount={editorDidMountStub} />);
    expect(editorDidMountStub).toHaveBeenCalledWith(editorInstanceStub);
  });

  test('should render children if provided with one', () => {
    const DummyComponent = () => <h1>Hello World!</h1>;
    const wrapper = shallow(<MonacoCodeEditor><DummyComponent/></MonacoCodeEditor>);
    expect(wrapper.find(DummyComponent)).toHaveLength(1);
  });

  test('should resize to height if provided with props', () => {
    const HEIGHT = 48, WIDTH = 48;
    const wrapper = shallow(<MonacoCodeEditor height={HEIGHT} width={WIDTH} />);
    expect(wrapper.find('.monaco-editor-container').props().style).toEqual({
      height: `${HEIGHT}px`,
      width: `${WIDTH}px`,
    });
  });

  test('should convert props to proper editor option', () => {
    const LANGUAGE = 'c', VALUE = 'Some test code', THEME = 'my-theme';
    const wrapper = shallow(
      <MonacoCodeEditor
        disableScrollBeyondLastColumn
        disableScrollBeyondLastLine
        hideHorizontalScrollbar
        hideLineNumbers
        hideMinimap
        hideVerticalScrollbar
        language={LANGUAGE}
        readOnly
        renderEOL
        theme={THEME}
        value={VALUE}
      />
    );
    const editorOptions = {
      language: LANGUAGE,
      lineNumbers: 'off',
      minimap: {
        enabled: false,
      },
      readOnly: true,
      renderFinalNewline: true,
      scrollbar: {
        horizontal: 'hidden',
        vertical: 'hidden',
      },
      scrollBeyondLastColumn: 0,
      scrollBeyondLastLine: false,
      theme: THEME,
      value: VALUE,
    };
    expect(editorCreateStub).toHaveBeenCalledWith(null, editorOptions);
    wrapper.setProps({ readOnly: false });
    expect(updateOptionsStub).toHaveBeenCalledWith({...editorOptions, readOnly: false });
  });

  test('should update Editor content and language on props change', () => {
    const LANGUAGE = 'c', VALUE = 'Some test code', THEME = 'my-theme';
    const wrapper = shallow(<MonacoCodeEditor />);
    wrapper.setProps({ language: LANGUAGE, value: VALUE, theme: THEME });
    expect(updateOptionsStub).toHaveBeenCalled();
    expect(editorSetModelLanguageStub).toHaveBeenCalledWith(null, LANGUAGE);
    expect(editorSetThemeStub).toHaveBeenCalledWith(THEME);
    expect(setValueStub).toHaveBeenCalledWith(VALUE);
  });

  test('should invoke callback in case of language change', () => {
    const
      OLDLANG = 'a',
      NEWLANG = 'b',
      event = { oldLanguage: OLDLANG, newLanguage: NEWLANG },
      onLanguageChangeCbStub = jest.fn();
    shallow(<MonacoCodeEditor onLanguageChange={onLanguageChangeCbStub} />);
    onLanguageChangeStub(event);
    expect(onLanguageChangeCbStub).toHaveBeenCalledWith(NEWLANG, OLDLANG, event);
  });

  test('should invoke callback in case of content change', () => {
    const
      OLDVALUE = 'a',
      NEWVALUE = 'b',
      event = {},
      onContentChangeCbStub = jest.fn();
    getValueStub.mockReturnValue(NEWVALUE);
    shallow(<MonacoCodeEditor value={OLDVALUE} onContentChange={onContentChangeCbStub} />);
    onContentChangeStub(event);
    expect(onContentChangeCbStub).toHaveBeenCalledWith(NEWVALUE, OLDVALUE, event);
  });

  test('should dispose Editor before component unmounts', () => {
    jest.useFakeTimers();
    const editorWillUnmountStub = jest.fn();
    const wrapper = shallow(<MonacoCodeEditor editorWillUnmount={editorWillUnmountStub} />);
    wrapper.unmount();
    expect(editorWillUnmountStub).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledWith(editorDisposeStub, 0);
  });
});
