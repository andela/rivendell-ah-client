import { RichUtils, getDefaultKeyBinding } from 'draft-js';
import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import '../../public/styles/SmartEditor.scss';
import createImagePlugin from 'draft-js-image-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { Button } from 'semantic-ui-react';
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

    this.styleBlockHelper = this.styleBlockHelper.bind(this);
    this.alignCenter = this.alignCenter.bind(this);
    this.alignLeft = this.alignLeft.bind(this);
    this.alignRight = this.alignRight.bind(this);
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
      const html = stateToHTML(editorState.getCurrentContent(),
        exportHtmlOptions);
      this.onValueChange(html);
    }

    handleKeyCommnd = (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.handleChange(newState);
        return true;
      }
      return false;
    }


    onBoldClick = () => {
      this.toggleInlineHelper('BOLD');
    }

    onUnderline = () => {
      this.toggleInlineHelper('UNDERLINE');
    }

    onItalic = () => {
      this.toggleInlineHelper('ITALIC');
    }


    blockStyleFn =(contentBlock) => {
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

    bindKey =(e) => {
      const { editorState } = this.state;
      if (e.keyCode === 9) { // if tab is pressed
        const newState = RichUtils.onTab(
          e, editorState, 5
        ); // move the cursor 5 places
        if (newState !== editorState) {
          this.handleChange(newState); // update editor
        }

        return;
      }

      return getDefaultKeyBinding(e);
    }


    convertBlockToHeader = () => {
      this.styleBlockHelper('header-one');
    }

    convertBlockToSubHeader = () => {
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


      return (
        <div id="smartEditor">

          <Button.Group
            as="span"
            buttons={[
              {
                key: 'bold',
                icon: 'bold',
                onClick: this.onBoldClick,
              },
              { key: 'underline',
                icon: 'underline',
                onClick: this.onUnderline
              },
              {
                key: 'italic',
                icon: 'italic',
                onClick: this.onItalic
              },
              {
                key: 'h1',
                content: 'heading',
                onClick: this.convertBlockToHeader
              },

              {
                key: 'h3',
                content: 'sub-heading',
                onClick: this.convertBlockToSubHeader
              },
              {
                key: 'bq',
                content: "' '",
                onClick: this.convertBlockToBlockqoute
              },

            ]}
          />


          <Button.Group
            buttons={[
              { key: 'align-left',
                icon: 'align left',
                onClick: this.alignLeft
              },
              {
                key: 'align-center',
                icon: 'align center',
                onClick: this.alignCenter,
              },

              {
                key: 'align right',
                icon: 'align right',
                onClick: this.alignRight
              },

            ]}
          />
          <EmojiSuggestions />
          <EmojiSelect />
          <div className="editor">

            <Editor
              editorState={editorState}
              onChange={this.handleChange}
              handleKeyCommand={this.handleKeyCommnd}
              spellCheck
              keyBindingFn={this.bindKey}
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
