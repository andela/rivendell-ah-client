import { EditorState, RichUtils,
  convertFromHTML, ContentState } from 'draft-js';
import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import Immutable from 'immutable';
import createImagePlugin from 'draft-js-image-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { Button } from 'semantic-ui-react';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js-emoji-plugin/lib/plugin.css';
import propTypes from 'prop-types';


// declaring plugins
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const imagePlugin = createImagePlugin();

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;


/**
 *
 * @param {object} contentBlock the currently selected block
 * @returns {void}
 */
const blockStyleFn = (contentBlock) => {
  switch (contentBlock.getType()) {
  case 'center': {
    return 'align-center';
  }
  case 'left': {
    return 'align-left';
  }
  case 'right': {
    return 'align-right';
  }
  case 'justify': {
    return 'align-justify';
  }
  case 'quote': {
    return 'quote';
  }

  default:
    return null;
  }
};
/**
 * This class is a Component that encapsulates the logic of the
 *  SnartEditor
 * @class SmartEditor
 */
class SmartEditor extends Component {
  /**
   *This constructs an instance of the SmartEditor
   using the onValueChange function passed to it as
   its argument
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.onValueChange = props.onValueChange;

    this.state = {
      editorState: createEditorStateWithText(''),
      initialHtml: '',
    };
    this.blockRenderMap = Immutable.Map({
      center: {
        element: 'div'
      },
      left: {
        element: 'div'
      },
      right: {
        element: 'div'
      },
      justify: {
        element: 'div'
      },
      blockquote: {
        element: 'blockquote'
      }
    });


    this.exportHtmlOptions = {
      blockRenderers: {
        center: (block) => {
          const data = `<div class="align-center">${
            escape(block.getText())}</div>`;
          return data;
        },
        left: (block) => {
          const data = `<div class="align-left">${
            escape(block.getText())}</div>`;
          return data;
        },
        right: (block) => {
          const data = `<div class="align-right">${
            escape(block.getText())}</div>`;
          return data;
        },
        justify: (block) => {
          const data = `<div class="align-justify">${
            escape(block.getText())}</div>`;
          return data;
        },
        quote: (block) => {
          const data = `<p class="quote">${escape(block.getText())}</p>`;
          return data;
        }
      },
      blockStyleFn,

    };

    this.textFileInput = null;
    this.blockStyleFn = blockStyleFn;
    this.textFileReader = new FileReader();
    this.textFileReader.addEventListener('loadend', () => {
      this.setState({
        editorState: createEditorStateWithText(this.textFileReader.result),
        initialHtml: '',
      });
    });
    this.createTextFileRef = (element) => {
      this.textFileInput = element;
    };

    this.onBoldClick = this.onBoldClick.bind(this);
    this.onUnderline = this.onUnderline.bind(this);
    this.onItalic = this.onItalic.bind(this);

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.styleBlockHelper = this.styleBlockHelper.bind(this);
    this.alignCenter = this.alignCenter.bind(this);
    this.alignLeft = this.alignLeft.bind(this);
    this.alignRight = this.alignRight.bind(this);
    this.alignJustify = this.alignJustify.bind(this);

    this.toggleInlineHelper = this.toggleInlineHelper.bind(this);
    this.convertBlockToHeader = this.convertBlockToHeader.bind(this);
    this.convertBlockToSubHeader = this.convertBlockToSubHeader.bind(this);
    this.convertBlockToBlockqoute = this.convertBlockToBlockqoute.bind(this);
    this.handleTextUpload = this.handleTextUpload.bind(this);
    this.focusEditor = this.focusEditor.bind(this);
    this.selectTextFile = this.selectTextFile.bind(this);
    this.setEditorRef = (ref) => {
      this.editor = ref;
    };
  }


  /**
   *
   * @returns {void} performs an action and returns void
   * @param  {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { initialHtml: htmlInState } = this.state;

    if (nextProps.initialHtml
      && nextProps.initialHtml !== htmlInState) {
      const blocksFromHTML = convertFromHTML(unescape(nextProps.initialHtml));
      const state = ContentState
        .createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
      this.setState({
        editorState: EditorState.createWithContent(state),
        initialHtml: nextProps.initialHtml,
      });
    }
  }

  /**
   * makes the currently selected text bold and returns void
   *@returns {void} makes the inline bold and returns nothing
    */
  onBoldClick() {
    this.toggleInlineHelper('BOLD');
  }


  /**
     * makes the currently selected text underline and returns void
     *@returns {void} makes the inline underline and returns nothing
     */
  onUnderline() {
    this.toggleInlineHelper('UNDERLINE');
  }

  /**
     * makes the currently selected text italic and returns void
     *@returns {void} makes the inline italic and returns nothing
     */
  onItalic() {
    this.toggleInlineHelper('ITALIC');
  }

  /**
   * this method runs anytime the user selects a new
   * file from using the <inpu type="file "/>
   *@returns {void} performs an action
   */
  handleTextUpload({ target: { files } }) {
    if (files[0]) {
      this.textFileReader.readAsText(files[0]);
    }
  }

  /**
     *
     * This helper function adds inline styles to the currently selected
     * block. These inline styles include bold, underline and italic.
     * Note that these are triggered by a button
     * @param {string} inlineStyle the inlineStyle name
     * this can be either UNDERLINE, BOLD or ITALIC
     * @returns {void} performs an action an
     */
  toggleInlineHelper(inlineStyle) {
    const { editorState } = this.state;
    const newState = RichUtils
      .toggleInlineStyle(editorState, inlineStyle.toUpperCase());
    this.handleChange(newState);
  }


  /**
   * this method updates the editorState of the draftjs Editor.
   * Note that the draftJS Editor is immutable thus be
   * updated anytime a change occurd
   * @param {object} editorState
   * @returns {void} updates the editorState and returns void
   */
  handleChange(editorState) {
    this.setState({ editorState });

    if (process.env.NODE_ENV === 'test') {
      return this.onValueChange(this.exportHtmlOptions);
    }

    const html = stateToHTML(
      editorState.getCurrentContent(),
      this.exportHtmlOptions
    );
    this.onValueChange(html);
  }

  /**
     * this function is called when keyboard combinations like
     * ctrl-b, ctrl-u and  cmd-i are pressed
     * @param {string} command the name of the command
     * @param {EditorState} editorState the editorState object
     * @returns {void} performs an action an
     */
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.handleChange(newState);
      return true;
    }
    return false;
  }

  /**
     *wraps the currently selected block  with a h1
     @returns {void} creates a header and rurns nothing
     */
  convertBlockToHeader() {
    this.styleBlockHelper('header-one');
  }

  /**
     *wraps the currently selected block  with a h3
     @returns {void} creates a sub-header and rurns nothing
     */
  convertBlockToSubHeader() {
    this.styleBlockHelper('header-three');
  }

  /**
     * wraps a blockquote on the current block
     * @returns {void} performs an action and return nothing
     */
  convertBlockToBlockqoute() {
    this.styleBlockHelper('quote');
  }

  /**
     * Center aligns the selected block
     * @returns {void} performs an action and return nothing
     */
  alignCenter() {
    this.styleBlockHelper('center');
  }


  /**
     * Left aligns the selected block
     * @returns {void} performs an action and return nothing
     */
  alignLeft() {
    this.styleBlockHelper('left');
  }


  /**
     * RIght aligns the selected block
     * @returns {void} performs an action and return nothing
     */
  alignRight() {
    this.styleBlockHelper('right');
  }

  /**
     * justifies the currently selected block
     * @returns {void} performs an action and return nothing
     */
  alignJustify() {
    this.styleBlockHelper('justify');
  }

  /**
     * Adds styles to the currently selected block
     * @param {object} blockName
     * @returns {void} performs an action and return nothing
     */
  styleBlockHelper(blockName) {
    const { editorState } = this.state;
    const newState = RichUtils
      .toggleBlockType(editorState, blockName);
    this.handleChange(newState);
  }


  /**
   *gives focus to the editor
   @returns {void} performs an action and returns nothing
   */
  focusEditor() {
    if (this.editor) {
      this.editor.focus();
    }
  }

  /**
   * this simulates the clicking of the file
   * <input> component that uploads a file
   *@returns {void} performs an action
   */
  selectTextFile() {
    if (this.textFileInput) {
      this.textFileInput.click();
    }
  }

  /**
     * @returns {JSX} when return
     */
  render() {
    const { editorState } = this.state;


    const buttons = [
      {
        id: 'textfile-button',
        icon: 'file',
        content: 'Upload Text File',
        onClick: this.selectTextFile
      },
      {
        id: 'bold',
        icon: 'bold',
        onClick: this.onBoldClick,
      },
      { id: 'underline',
        icon: 'underline',
        onClick: this.onUnderline
      },
      {
        id: 'italic',
        icon: 'italic',
        onClick: this.onItalic
      },
      { id: 'align-left',
        icon: 'align left',
        onClick: this.alignLeft
      },
      {
        id: 'align-center',
        icon: 'align center',
        onClick: this.alignCenter,
      },

      {
        id: 'align-right',
        icon: 'align right',
        onClick: this.alignRight
      },
      {
        id: 'align-justify',
        icon: 'align justify',
        onClick: this.alignJustify
      },
      {
        id: 'heading',
        content: 'heading',
        onClick: this.convertBlockToHeader
      },

      {
        id: 'sub-heading',
        content: 'sub-heading',
        onClick: this.convertBlockToSubHeader
      },
      {
        id: 'bq',
        content: "' '",
        onClick: this.convertBlockToBlockqoute
      },
    ];
    return (
      <div
        id="smart-editor"
        onClick={this.focusEditor}

      >

        <input
          type="file"
          hidden
          accept=".txt, .doc, .docx"
          onChange={this.handleTextUpload}
          ref={this.createTextFileRef}
        />


        <Button.Group>
          {buttons.map(button => (
            <Button
              key={button.id + button.content + button.content}
              id={button.id}
              icon={button.icon}
              content={button.content}
              onClick={button.onClick}
            />
          ))}
        </Button.Group>

        <EmojiSuggestions />
        <EmojiSelect />
        <div className="articleView" onClick={this.focusEditor}>

          <Editor
            editorState={editorState}
            onChange={this.handleChange}
            handleKeyCommand={this.handleKeyCommand}
            spellCheck
            plugins={[emojiPlugin, imagePlugin]}
            blockStyleFn={this.blockStyleFn}
            blockRenderMap={this.blockRenderMap}
            ref={this.setEditorRef}
          />

        </div>


      </div>

    );
  }
}


SmartEditor.propTypes = {
  onValueChange: propTypes.func.isRequired,
  initialHtml: propTypes.string,
};


SmartEditor.defaultProps = {
  initialHtml: '',
};
export default SmartEditor;
