import { RichUtils } from 'draft-js';
import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import '../../public/styles/SmartEditor.scss';
import createImagePlugin from 'draft-js-image-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { Button, Icon } from 'semantic-ui-react';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js-emoji-plugin/lib/plugin.css';
import Immutable from 'immutable';

// declaring plugins
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const imagePlugin = createImagePlugin();

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;


/**
 *@param  editorState  state value
 *@returns {void} description
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

    this.onBoldClick = this.onBoldClick.bind(this);
    this.onUnderline = this.onUnderline.bind(this);
    this.onItalic = this.onItalic.bind(this);

    this.blockStyleFn = this.blockStyleFn.bind(this);

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

    handleChange = (editorState) => {
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

    handleKeyCommand(command, editorState) {
      console.log(command);
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.handleChange(newState);
        return true;
      }
      return false;
    }


    onBoldClick() {
      this.toggleInlineHelper('BOLD');
    }

    onUnderline() {
      this.toggleInlineHelper('UNDERLINE');
    }

    onItalic() {
      this.toggleInlineHelper('ITALIC');
    }


    blockStyleFn(contentBlock) {
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
    }

    /**
     * @param {string} inlineStyle
     */
    toggleInlineHelper = (inlineStyle) => {
      const { editorState } = this.state;
      const newState = RichUtils
        .toggleInlineStyle(editorState, inlineStyle.toUpperCase());
      this.handleChange(newState);
    }


    convertBlockToHeader() {
      this.styleBlockHelper('header-one');
    }

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


      const textTransformButtons = [
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
      const alignButtons = [
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
      return (
        <div id="smartEditor">

          <Button.Group>
            {textTransformButtons.map(button => (
              <Button key={button.id} icon id={button.id} onClick={button.onClick}>
                <Icon name={button.icon} />
              </Button>
            ))}
          </Button.Group>

          <Button.Group>
            {alignButtons.map(button => (
              <Button
                key={button.id}
                icon
                id={button.id}
                onClick={button.onClick}
              >
                <Icon name={button.icon} />
              </Button>
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

export default SmartEditor;
