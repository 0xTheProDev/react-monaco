// @flow
/** This file is flow-compatible version of monaco-editor/index.d.ts */
/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Type definitions for monaco-editor v0.16.2
 * Released under the MIT license
*-----------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface IStandaloneCodeEditor {};

/**
 * Configuration options for the editor.
 */
export interface IEditorOptions {
  /**
   * The aria label for the editor's textarea (when it is focused).
   */
  ariaLabel?: string;
  /**
   * Render vertical lines at the specified columns.
   * Defaults to empty array.
   */
  rulers?: number[];
  /**
   * A string containing the word separators used when doing word navigation.
   * Defaults to `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
   */
  wordSeparators?: string;
  /**
   * Enable Linux primary clipboard.
   * Defaults to true.
   */
  selectionClipboard?: boolean;
  /**
   * Control the rendering of line numbers.
   * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
   * Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function).
   * Otherwise, line numbers will not be rendered.
   * Defaults to true.
   */
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval' | ((lineNumber: number) => string);
  /**
   * Render last line number when the file ends with a newline.
   * Defaults to true on Windows/Mac and to false on Linux.
  */
  renderFinalNewline?: boolean;
  /**
   * Should the corresponding line be selected when clicking on the line number?
   * Defaults to true.
   */
  selectOnLineNumbers?: boolean;
  /**
   * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
   * Defaults to 5.
   */
  lineNumbersMinChars?: number;
  /**
   * Enable the rendering of the glyph margin.
   * Defaults to true in vscode and to false in monaco-editor.
   */
  glyphMargin?: boolean;
  /**
   * The width reserved for line decorations (in px).
   * Line decorations are placed between line numbers and the editor content.
   * You can pass in a string in the format floating point followed by "ch". e.g. 1.3ch.
   * Defaults to 10.
   */
  lineDecorationsWidth?: number | string;
  /**
   * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
   * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
   * Defaults to 30 (px).
   */
  revealHorizontalRightPadding?: number;
  /**
   * Render the editor selection with rounded borders.
   * Defaults to true.
   */
  roundedSelection?: boolean;
  /**
   * Class name to be added to the editor.
   */
  extraEditorClassName?: string;
  /**
   * Should the editor be read only.
   * Defaults to false.
   */
  readOnly?: boolean;
  /**
   * Control the behavior and rendering of the scrollbars.
   */
  scrollbar?: IEditorScrollbarOptions;
  /**
   * Control the behavior and rendering of the minimap.
   */
  minimap?: IEditorMinimapOptions;
  /**
   * Control the behavior of the find widget.
   */
  find?: IEditorFindOptions;
  /**
   * Display overflow widgets as `fixed`.
   * Defaults to `false`.
   */
  fixedOverflowWidgets?: boolean;
  /**
   * The number of vertical lanes the overview ruler should render.
   * Defaults to 2.
   */
  overviewRulerLanes?: number;
  /**
   * Controls if a border should be drawn around the overview ruler.
   * Defaults to `true`.
   */
  overviewRulerBorder?: boolean;
  /**
   * Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'.
   * Defaults to 'blink'.
   */
  cursorBlinking?: string;
  /**
   * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
   * Defaults to false.
   */
  mouseWheelZoom?: boolean;
  /**
   * Enable smooth caret animation.
   * Defaults to false.
   */
  cursorSmoothCaretAnimation?: boolean;
  /**
   * Control the cursor style, either 'block' or 'line'.
   * Defaults to 'line'.
   */
  cursorStyle?: string;
  /**
   * Control the width of the cursor when cursorStyle is set to 'line'
   */
  cursorWidth?: number;
  /**
   * Enable font ligatures.
   * Defaults to false.
   */
  fontLigatures?: boolean;
  /**
   * Disable the use of `will-change` for the editor margin and lines layers.
   * The usage of `will-change` acts as a hint for browsers to create an extra layer.
   * Defaults to false.
   */
  disableLayerHinting?: boolean;
  /**
   * Disable the optimizations for monospace fonts.
   * Defaults to false.
   */
  disableMonospaceOptimizations?: boolean;
  /**
   * Should the cursor be hidden in the overview ruler.
   * Defaults to false.
   */
  hideCursorInOverviewRuler?: boolean;
  /**
   * Enable that scrolling can go one screen size after the last line.
   * Defaults to true.
   */
  scrollBeyondLastLine?: boolean;
  /**
   * Enable that scrolling can go beyond the last column by a number of columns.
   * Defaults to 5.
   */
  scrollBeyondLastColumn?: number;
  /**
   * Enable that the editor animates scrolling to a position.
   * Defaults to false.
   */
  smoothScrolling?: boolean;
  /**
   * Enable that the editor will install an interval to check if its container dom node size has changed.
   * Enabling this might have a severe performance impact.
   * Defaults to false.
   */
  automaticLayout?: boolean;
  /**
   * Control the wrapping of the editor.
   * When `wordWrap` = "off", the lines will never wrap.
   * When `wordWrap` = "on", the lines will wrap at the viewport width.
   * When `wordWrap` = "wordWrapColumn", the lines will wrap at `wordWrapColumn`.
   * When `wordWrap` = "bounded", the lines will wrap at min(viewport width, wordWrapColumn).
   * Defaults to "off".
   */
  wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  /**
   * Control the wrapping of the editor.
   * When `wordWrap` = "off", the lines will never wrap.
   * When `wordWrap` = "on", the lines will wrap at the viewport width.
   * When `wordWrap` = "wordWrapColumn", the lines will wrap at `wordWrapColumn`.
   * When `wordWrap` = "bounded", the lines will wrap at min(viewport width, wordWrapColumn).
   * Defaults to 80.
   */
  wordWrapColumn?: number;
  /**
   * Force word wrapping when the text appears to be of a minified/generated file.
   * Defaults to true.
   */
  wordWrapMinified?: boolean;
  /**
   * Control indentation of wrapped lines. Can be: 'none', 'same', 'indent' or 'deepIndent'.
   * Defaults to 'same' in vscode and to 'none' in monaco-editor.
   */
  wrappingIndent?: string;
  /**
   * Configure word wrapping characters. A break will be introduced before these characters.
   * Defaults to '{([+'.
   */
  wordWrapBreakBeforeCharacters?: string;
  /**
   * Configure word wrapping characters. A break will be introduced after these characters.
   * Defaults to ' \t})]?|&,;'.
   */
  wordWrapBreakAfterCharacters?: string;
  /**
   * Configure word wrapping characters. A break will be introduced after these characters only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
   * Defaults to '.'.
   */
  wordWrapBreakObtrusiveCharacters?: string;
  /**
   * Performance guard: Stop rendering a line after x characters.
   * Defaults to 10000.
   * Use -1 to never stop rendering
   */
  stopRenderingLineAfter?: number;
  /**
   * Configure the editor's hover.
   */
  hover?: IEditorHoverOptions;
  /**
   * Enable detecting links and making them clickable.
   * Defaults to true.
   */
  links?: boolean;
  /**
   * Enable inline color decorators and color picker rendering.
   */
  colorDecorators?: boolean;
  /**
   * Enable custom contextmenu.
   * Defaults to true.
   */
  contextmenu?: boolean;
  /**
   * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
   * Defaults to 1.
   */
  mouseWheelScrollSensitivity?: number;
  /**
   * FastScrolling mulitplier speed when pressing `Alt`
   * Defaults to 5.
   */
  fastScrollSensitivity?: number;
  /**
   * The modifier to be used to add multiple cursors with the mouse.
   * Defaults to 'alt'
   */
  multiCursorModifier?: 'ctrlCmd' | 'alt';
  /**
   * Merge overlapping selections.
   * Defaults to true
   */
  multiCursorMergeOverlapping?: boolean;
  /**
   * Configure the editor's accessibility support.
   * Defaults to 'auto'. It is best to leave this to 'auto'.
   */
  accessibilitySupport?: 'auto' | 'off' | 'on';
  /**
   * Suggest options.
   */
  suggest?: ISuggestOptions;
  /**
   * Enable quick suggestions (shadow suggestions)
   * Defaults to true.
   */
  quickSuggestions?: boolean | {
    other: boolean;
    comments: boolean;
    strings: boolean;
  };
  /**
   * Quick suggestions show delay (in ms)
   * Defaults to 500 (ms)
   */
  quickSuggestionsDelay?: number;
  /**
   * Parameter hint options.
   */
  parameterHints?: IEditorParameterHintOptions;
  /**
   * Render icons in suggestions box.
   * Defaults to true.
   */
  iconsInSuggestions?: boolean;
  /**
   * Options for auto closing brackets.
   * Defaults to language defined behavior.
   */
  autoClosingBrackets?: EditorAutoClosingStrategy;
  /**
   * Options for auto closing quotes.
   * Defaults to language defined behavior.
   */
  autoClosingQuotes?: EditorAutoClosingStrategy;
  /**
   * Options for auto surrounding.
   * Defaults to always allowing auto surrounding.
   */
  autoSurround?: EditorAutoSurroundStrategy;
  /**
   * Enable auto indentation adjustment.
   * Defaults to false.
   */
  autoIndent?: boolean;
  /**
   * Enable format on type.
   * Defaults to false.
   */
  formatOnType?: boolean;
  /**
   * Enable format on paste.
   * Defaults to false.
   */
  formatOnPaste?: boolean;
  /**
   * Controls if the editor should allow to move selections via drag and drop.
   * Defaults to false.
   */
  dragAndDrop?: boolean;
  /**
   * Enable the suggestion box to pop-up on trigger characters.
   * Defaults to true.
   */
  suggestOnTriggerCharacters?: boolean;
  /**
   * Accept suggestions on ENTER.
   * Defaults to 'on'.
   */
  acceptSuggestionOnEnter?: boolean | 'on' | 'smart' | 'off';
  /**
   * Accept suggestions on provider defined characters.
   * Defaults to true.
   */
  acceptSuggestionOnCommitCharacter?: boolean;
  /**
   * Enable snippet suggestions. Default to 'true'.
   */
  snippetSuggestions?: 'top' | 'bottom' | 'inline' | 'none';
  /**
   * Copying without a selection copies the current line.
   */
  emptySelectionClipboard?: boolean;
  /**
   * Syntax highlighting is copied.
   */
  copyWithSyntaxHighlighting?: boolean;
  /**
   * Enable word based suggestions. Defaults to 'true'
   */
  wordBasedSuggestions?: boolean;
  /**
   * The history mode for suggestions.
   */
  suggestSelection?: 'first' | 'recentlyUsed' | 'recentlyUsedByPrefix';
  /**
   * The font size for the suggest widget.
   * Defaults to the editor font size.
   */
  suggestFontSize?: number;
  /**
   * The line height for the suggest widget.
   * Defaults to the editor line height.
   */
  suggestLineHeight?: number;
  /**
   * Enable tab completion.
   */
  tabCompletion?: boolean | 'on' | 'off' | 'onlySnippets';
  /**
   * Enable selection highlight.
   * Defaults to true.
   */
  selectionHighlight?: boolean;
  /**
   * Enable semantic occurrences highlight.
   * Defaults to true.
   */
  occurrencesHighlight?: boolean;
  /**
   * Show code lens
   * Defaults to true.
   */
  codeLens?: boolean;
  /**
   * Control the behavior and rendering of the code action lightbulb.
   */
  lightbulb?: IEditorLightbulbOptions;
  /**
   * Code action kinds to be run on save.
   */
  codeActionsOnSave?: ICodeActionsOnSaveOptions;
  /**
   * Timeout for running code actions on save.
   */
  codeActionsOnSaveTimeout?: number;
  /**
   * Enable code folding
   * Defaults to true.
   */
  folding?: boolean;
  /**
   * Selects the folding strategy. 'auto' uses the strategies contributed for the current document, 'indentation' uses the indentation based folding strategy.
   * Defaults to 'auto'.
   */
  foldingStrategy?: 'auto' | 'indentation';
  /**
   * Controls whether the fold actions in the gutter stay always visible or hide unless the mouse is over the gutter.
   * Defaults to 'mouseover'.
   */
  showFoldingControls?: 'always' | 'mouseover';
  /**
   * Enable highlighting of matching brackets.
   * Defaults to true.
   */
  matchBrackets?: boolean;
  /**
   * Enable rendering of whitespace.
   * Defaults to none.
   */
  renderWhitespace?: 'none' | 'boundary' | 'all';
  /**
   * Enable rendering of control characters.
   * Defaults to false.
   */
  renderControlCharacters?: boolean;
  /**
   * Enable rendering of indent guides.
   * Defaults to true.
   */
  renderIndentGuides?: boolean;
  /**
   * Enable highlighting of the active indent guide.
   * Defaults to true.
   */
  highlightActiveIndentGuide?: boolean;
  /**
   * Enable rendering of current line highlight.
   * Defaults to all.
   */
  renderLineHighlight?: 'none' | 'gutter' | 'line' | 'all';
  /**
   * Inserting and deleting whitespace follows tab stops.
   */
  useTabStops?: boolean;
  /**
   * The font family
   */
  fontFamily?: string;
  /**
   * The font weight
   */
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  /**
   * The font size
   */
  fontSize?: number;
  /**
   * The line height
   */
  lineHeight?: number;
  /**
   * The letter spacing
   */
  letterSpacing?: number;
  /**
   * Controls fading out of unused variables.
   */
  showUnused?: boolean;
};

/**
 * The options to create an editor.
 */
export interface IEditorConstructionOptions extends IEditorOptions {
  /**
   * The initial model associated with this code editor.
   */
  model?: ITextModel | null;
  /**
   * The initial value of the auto created model in the editor.
   * To not create automatically a model, use `model: null`.
   */
  value?: string;
  /**
   * The initial language of the auto created model in the editor.
   * To not create automatically a model, use `model: null`.
   */
  language?: string;
  /**
   * Initial theme to be used for rendering.
   * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
   * You can create custom themes via `monaco.editor.defineTheme`.
   * To switch a theme, use `monaco.editor.setTheme`
   */
  theme?: string;
  /**
   * An URL to open when Ctrl+H (Windows and Linux) or Cmd+H (OSX) is pressed in
   * the accessibility help dialog in the editor.
   *
   * Defaults to "https://go.microsoft.com/fwlink/?linkid=852450"
   */
  accessibilityHelpUrl?: string;
};

/**
 * An event describing that the current mode associated with a model has changed.
 */
export interface IModelLanguageChangedEvent {
  /**
   * Previous language
   */
  +oldLanguage: string;
  /**
   * New language
   */
  +newLanguage: string;
};

/**
 * An event describing a change in the text of a model.
 */
export interface IModelContentChange {
  /**
   * The range that got replaced.
   */
  +range: IRange;
  /**
   * The offset of the range that got replaced.
   */
  +rangeOffset: number;
  /**
   * The length of the range that got replaced.
   */
  +rangeLength: number;
  /**
   * The new text for the range.
   */
  +text: string;
};

export interface IModelContentChangedEvent {
  +changes: IModelContentChange[];
  /**
   * The (new) end-of-line character.
   */
  +eol: string;
  /**
   * The new version id the model has transitioned to.
   */
  +versionId: number;
  /**
   * Flag that indicates that this event was generated while undoing.
   */
  +isUndoing: boolean;
  /**
   * Flag that indicates that this event was generated while redoing.
   */
  +isRedoing: boolean;
  /**
   * Flag that indicates that all decorations were lost with this edit.
   * The model has been reset to a new value.
   */
  +isFlush: boolean;
};
