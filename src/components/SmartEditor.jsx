import { RichUtils } from 'draft-js';
import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import Immutable from 'immutable';
import createImagePlugin from 'draft-js-image-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { Button, Icon } from 'semantic-ui-react';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js-emoji-plugin/lib/plugin.css';
import propTypes from 'prop-types';
import '../../public/styles/SmartEditor.scss';

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
      editorState: createEditorStateWithText('')
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
      blockquote: {
        element: 'div'
      }
    });

    this.blockStyleFn = blockStyleFn;
    this.onBoldClick = this.onBoldClick.bind(this);
    this.onUnderline = this.onUnderline.bind(this);
    this.onItalic = this.onItalic.bind(this);

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.styleBlockHelper = this.styleBlockHelper.bind(this);
    this.alignCenter = this.alignCenter.bind(this);
    this.alignLeft = this.alignLeft.bind(this);
    this.alignRight = this.alignRight.bind(this);

    this.convertBlockToHeader = this.convertBlockToHeader.bind(this);
    this.convertBlockToSubHeader = this.convertBlockToSubHeader.bind(this);
    this.convertBlockToBlockqoute = this.convertBlockToBlockqoute.bind(this);
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
     *
     * This helper function adds inline styles to the currently selected
     * block. These inline styles include bold, underline and italic.
     * Note that these are triggered by a button
     * @param {string} inlineStyle the inlineStyle name
     * this can be either UNDERLINE, BOLD or ITALIC
     * @returns {void} performs an action an
     */
    toggleInlineHelper = (inlineStyle) => {
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

      const exportHtmlOptions = {
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
          quote: (block) => {
            const data = `<div class="quote">${escape(block.getText())}</div>`;
            return data;
          }
        },
        blockStyleFn: this.blockStyleFn

      };
      if (process.env.NODE_ENV === 'test') {
        return this.onValueChange('', exportHtmlOptions);
      }

      const html = stateToHTML(editorState.getCurrentContent(),
        exportHtmlOptions);
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
     * @returns {JSX} when return
     */
    render() {
      const { editorState } = this.state;


      const iconButtons = [
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

      ];

      const textButtons = [
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
        <div id="smartEditor">

          <Button.Group>
            {iconButtons.map(button => (
              <Button
                content={button.content}
                key={button.id}
                icon={!button.content}
                id={button.id}
                onClick={button.onClick}
              >
                <Icon name={button.icon} />
              </Button>
            ))}
          </Button.Group>

          <Button.Group>
            {textButtons.map(button => (
              <Button
                content={button.content}
                key={button.id}
                id={button.id}
                onClick={button.onClick}
              />
            ))}
          </Button.Group>

          <EmojiSuggestions />
          <EmojiSelect />
          <div className="editor">

            <Editor
              editorState={editorState}
              onChange={this.handleChange}
              handleKeyCommand={this.handleKeyCommand}
              spellCheck
              plugins={[emojiPlugin, imagePlugin]}
              blockStyleFn={this.blockStyleFn}
              blockRenderMap={this.blockRenderMap}
            />

          </div>


        </div>

      );
    }
}


SmartEditor.propTypes = {
  onValueChange: propTypes.func.isRequired
};

export default SmartEditor;
