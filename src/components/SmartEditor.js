import '../../public/styles/SmartEditor.scss';
import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { RichUtils } from 'draft-js';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

/**
 * @returns {void} when called
 */
export default class SmartEditor extends Component {
    // create a new EditorState and keep it in state
    state = {
      editorState: createEditorStateWithText(''),
    };

    /**
     * implement the onChange handeler up update the EditorState
     * @returns {void} void is returned
     * @param newEditorState is the new state of the app
     */
    editorStateChanged = newEditorState => this.setState(
      { editorState: newEditorState }
    );


    handleKeyCommand = (command) => {
      const { editorState } = this.state;
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.editorStateChanged(newState);
        return 'handled';
      }
      return 'not-handled';
    }

    handleButtonClick = () => {

    };


    boldText =() => {
      const { editorState } = this.state;
      this.editorStateChanged(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    underline =() => {
      const { editorState } = this.state;
      this.editorStateChanged(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }

    handleInputChange =(e, { value }) => {
      this.setState({
        imgUrl: value,
        editorState: this.state.editorState
      });
    }

    /**
     *Renders html
     @returns {JSX} to the user
     */
    render() {
      const { editorState } = this.state;
      return (
        <div className="editor">
          <Button.Group
            buttons={[
              { key: 'bold', icon: 'bold', onClick: this.boldText },
              { key: 'underline', icon: 'underline', onClick: this.underline },
              { key: 'text width', icon: 'text width' },
            ]}
          />

          <Editor
            editorState={editorState}
            onChange={this.editorStateChanged}
            handleKeyCommand={this.handleKeyCommand}
            plugins={[emojiPlugin]}
          />

          <Input
            onChange={this.handleInputChange}
            value={this.state.imgUrl}
          />
          <Button content="Embed Image" onClick={this.handleButtonClick} />
        </div>
      );
    }
}

// import React, { Component } from 'react';
// import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
// import createEmojiPlugin from 'draft-js-emoji-plugin';
// import editorStyles from 'draft-js-emoji-plugin/lib/plugin.css';

// const emojiPlugin = createEmojiPlugin();
// const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
// const plugins = [emojiPlugin];
// const text = `Cool, we can have all sorts of Emojis here. 🙌
// 🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`;
// /**
//    *@returns {void} vodi
//    */
// export default class SimpleEmojiEditor extends Component {
//   state = {
//     editorState: createEditorStateWithText(text),
//   };

//   /**
//    *@returns {void} vodi
//    */
//   onChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   /**
//    *@returns {void} vodi
//    */
//   focus = () => {
//     this.editor.focus();
//   };

//   /**
//    *@returns {void} vodi
//    */
//   render() {
//     return (
//       <div>
//         <div className={`${editorStyles.editor} editor`} onClick={this.focus}>
//           <Editor
//             editorState={this.state.editorState}
//             onChange={this.onChange}
//             plugins={plugins}
//             ref={(element) => { this.editor = element; }}
//           />
//           <EmojiSuggestions />
//         </div>
//         <div className={editorStyles.options}>
//           <EmojiSelect />
//         </div>
//       </div>
//     );
//   }
// }
