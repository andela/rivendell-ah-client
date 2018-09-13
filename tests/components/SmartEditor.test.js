/* eslint no-undef: off */
import chai from 'chai';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { shallow } from 'enzyme';
import Editor from 'draft-js-plugins-editor';
import Immutable from 'immutable';
import SmartEditor from '../../src/components/SmartEditor';

describe('testing SmartEditor', () => {
  describe('the components that are rendered int he component', () => {
    it('should render a Button.Group', () => {
      const wrapper = shallow(<SmartEditor />);
      chai.expect(wrapper.find(Button.Group).length)
        .greaterThan(0);
    });
    it('should render a  DraftJS plugin Editor', () => {
      const wrapper = shallow(<SmartEditor />);
      chai.expect(wrapper.find(Editor).length)
        .greaterThan(0);
    });
  });

  describe('this.blockRenderMap in the SmartEditor', () => {
    it('should be an Immutable map', () => {
      const wrapper = shallow(<SmartEditor />);
      chai.expect(wrapper.instance().blockRenderMap instanceof Immutable.Map);
    });

    it('should have attribute center', () => {
      const wrapperInstance = shallow(<SmartEditor />).instance();
      const blockMap = wrapperInstance.blockRenderMap;
      chai.expect(blockMap.get('center'))
        .to.be.an('object');
      chai.expect(blockMap.get('center'))
        .property('element')
        .to.equal('div');
    });
  });
  describe('the functions of the SmartEditor', () => {
    it('should call the onValueChange method when a change occurs', () => {
      const mockOnChange = jest.fn();
      const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);
      const editorState = wrapper.find(Editor).prop('editorState');
      const onChangeArg = {
        getCurrentContent: () => editorState
      };
      wrapper.find(Editor).simulate('change', onChangeArg);
      chai.expect(mockOnChange.mock.calls.length)
        .to.equal(1);
    });

    it('should call the onBoldClick when teh bold button is clicked', () => {
      const spy = jest.spyOn(SmartEditor.prototype, 'onBoldClick');
      const mockOnChange = jest.fn();
      const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

      wrapper.find('Button#bold')
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should call the onUnderline when the underline button is clicked', () => {
      const spy = jest.spyOn(SmartEditor.prototype, 'onUnderline');
      const mockOnChange = jest.fn();
      const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

      wrapper.find('Button#underline')
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should call the onItalic when the underline button is clicked', () => {
      const spy = jest.spyOn(SmartEditor.prototype, 'onItalic');
      const mockOnChange = jest.fn();
      const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

      wrapper.find('Button#italic')
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });
    it('should call the convertBlockToHeader when the heading button is clicked', () => {
      const spy = jest.spyOn(SmartEditor.prototype, 'convertBlockToHeader');
      const mockOnChange = jest.fn();
      const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

      wrapper.find('Button#heading')
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });
    it('should call the convertBlockToSubHeader when the sub-heading button is clicked', () => {
      const spy = jest.spyOn(SmartEditor.prototype, 'convertBlockToSubHeader');
      const mockOnChange = jest.fn();
      const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

      wrapper.find('Button#sub-heading')
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should call the convertBlockToBlockqoute when the bq button is clicked', () => {
      const spy = jest.spyOn(SmartEditor.prototype, 'convertBlockToBlockqoute');
      const mockOnChange = jest.fn();
      const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

      wrapper.find('Button#bq')
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should call the alignLeft when the align-left button is clicked', () => {
      const spy = jest.spyOn(SmartEditor.prototype, 'alignLeft');
      const mockOnChange = jest.fn();
      const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

      wrapper.find('Button#align-left')
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should call the alignRight when the align-right button is clicked', () => {
    const spy = jest.spyOn(SmartEditor.prototype, 'alignRight');

    const blockStyleFnSpy = spyOn(SmartEditor.prototype, 'alignRight');
    const mockOnChange = jest.fn();
    const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

    wrapper.find('Button#align-right')
      .simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(blockStyleFnSpy).toHaveBeenCalled();
  });

  it('should call the alignCenter when the align-center button is clicked', () => {
    const spy = jest.spyOn(SmartEditor.prototype, 'alignCenter');
    const mockOnChange = jest.fn();
    const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);

    wrapper.find('Button#align-center')
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should return true when the UNDERLINE is passed as argument to handleKyCommand', () => {
    const spy = jest.spyOn(SmartEditor.prototype, 'handleKeyCommand');
    const mockOnChange = jest.fn();
    const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);
    const editorState = wrapper.find(Editor).prop('editorState');
    const success = wrapper.instance().handleKeyCommand('underline', editorState);
    chai.expect(success)
      .to.equal(true);

    expect(spy).toHaveBeenCalled();
  });

  it('should return false when a bad command is passed as argument to handleKyCommand', () => {
    const spy = jest.spyOn(SmartEditor.prototype, 'handleKeyCommand');
    const mockOnChange = jest.fn();
    const wrapper = shallow(<SmartEditor onValueChange={mockOnChange} />);
    const editorState = wrapper.find(Editor).prop('editorState');
    const success = wrapper.instance().handleKeyCommand('junk', editorState);
    chai.expect(success)
      .to.equal(false);

    expect(spy).toHaveBeenCalled();
  });
});
