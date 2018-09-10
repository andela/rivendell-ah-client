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
  }


    handleChange = (editorState) => {
      this.setState({ editorState });
      const html = stateToHTML(editorState.getCurrentContent());
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
      const { editorState } = this.state;
      const newState = RichUtils
        .toggleBlockType(editorState, 'header-one');
      this.handleChange(newState);
    }

    convertBlockToSubHeader = () => {
      const { editorState } = this.state;
      const newState = RichUtils
        .toggleBlockType(editorState, 'header-three');
      this.handleChange(newState);
    }

    /**
     * @returns {JSX} when return
     */
    render() {
      const { editorState } = this.state;


      return (
        <div className="editor">


          <div>
            <Button.Group
              buttons={[
                {
                  key: 'bold',
                  icon: 'bold',
                  onClick: this.onBoldClick
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

              ]}
            />
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
            <EmojiSuggestions />
          </div>

          <div>
            <EmojiSelect />
          </div>
        </div>

      );
    }
}

export default SmartEditor;
