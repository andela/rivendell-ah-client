
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Button } from 'semantic-ui-react';
import Editor from 'draft-js-plugins-editor';
import { EditArticleControls, mapDispatchToProps, mapStateToProps } from '../../src/components/EditArticleControls';
import CategoryInput from '../../src/components/CategoryInput';
import TagInput from '../../src/components/TagInput';
import SmartEditor from '../../src/components/SmartEditor';

describe('Testing EditArticleControls', () => {
  let mountedObj;


  const initialArticleState = {
    editing: true,
    isLoading: false,
    success: false,
    article: {},
    errors: {}
  };
  const getMountedObj = (
    articleState = initialArticleState,
    categories = []
  ) => {
    const emptyFunction = () => {};
    return shallow(<EditArticleControls
      persistArticle={emptyFunction}
      loadCategories={emptyFunction}
      createArticleState={articleState}
      categories={categories}
    />);
  };
  describe('basic elements rendered in the component', () => {
    it('should contain a CategoryInput', () => {
      mountedObj = getMountedObj();
      chai.expect(mountedObj.find(CategoryInput).length)
        .to.equal(1);
    });
    it('should contain a TagInput', () => {
      mountedObj = getMountedObj();
      chai.expect(mountedObj.find(TagInput).length)
        .to.equal(1);
    });
    it('should contain a semantic-ui-react Button', () => {
      mountedObj = getMountedObj();
      chai.expect(mountedObj.find(Button).length)
        .to.equal(1);
    });
  });


  describe('the  mapStateToProps and mapDispatchToProps', () => {
    it('mapStateToProps should correctly map the state passed as argument', () => {
      const state = {
        createArticle: 'dummyValue',
        loadCategoriesReducer: { categories: [] }
      };
      const mappedState = mapStateToProps(state);
      chai.expect(mappedState.createArticleState)
        .to.equal(state.createArticle);
      chai.expect(mappedState.categories)
        .to.equal(state.loadCategoriesReducer.categories);
    });

    it('mapDispatchToProps should map the correct values', () => {
      const dispatchObj = {
        dispatch: () => {}
      };
      const dispatchSpy = jest.spyOn(dispatchObj, 'dispatch');
      const mappedObj = mapDispatchToProps(dispatchObj.dispatch);
      mappedObj.persistArticle();
      mappedObj.loadCategories();
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
    });
  });
  describe('the functions contained in the object', () => {
    describe('componentDidMount()', () => {
      it('should call componentDidMount after the component has been mounted', () => {
        const spy = jest.spyOn(EditArticleControls.prototype, 'componentDidMount');
        mountedObj = getMountedObj();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onBodyChange', () => {
      mountedObj = getMountedObj();
      it('should update the body in the state when', () => {
        const instance = mountedObj.instance();
        const expected = 'this is the body';
        instance.onBodyChange(expected);

        chai.expect(instance.state.body)
          .to.equal(expected);
      });
    });


    describe('handleAddition', () => {
      it('should update the body in the state when', () => {
        mountedObj = getMountedObj();
        const instance = mountedObj.instance();
        const expected = 'test';

        instance.handleAddition(null, { value: expected });
        const { tagOptions } = instance.state;
        const found = tagOptions.findIndex(tagOption => tagOption.value === expected);
        chai.expect(found)
          .to.be.greaterThan(-1);
      });
    });

    describe('submit', () => {
      it('should be called when the submit button is clicked', () => {
        const spy = jest.spyOn(EditArticleControls.prototype, 'submit');
        mountedObj = getMountedObj();
        mountedObj.find(Button)
          .simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('updateCategory', () => {
      mountedObj = getMountedObj();
      it('should update the body in the state when', () => {
        const instance = mountedObj.instance();
        const expected = 'Arts';
        instance.updateCategory(null, { value: expected });

        chai.expect(instance.state.category)
          .to.equal(expected);
      });
    });

    describe('updateDescription', () => {
      mountedObj = getMountedObj();
      it('should update the body in the state when', () => {
        const instance = mountedObj.instance();
        const expected = 'this is a great description';
        instance.updateDescription(null, { value: expected });

        chai.expect(instance.state.description)
          .to.equal(expected);
      });
    });
    describe('updateTitle', () => {
      mountedObj = getMountedObj();
      it('should update the body in the state when', () => {
        const instance = mountedObj.instance();
        const expected = 'Testing in ReactJS';
        instance.updateTitle(null, { value: expected });

        chai.expect(instance.state.title)
          .to.equal(expected);
      });
    });

    describe('updateTags', () => {
      mountedObj = getMountedObj();
      it('should update the body in the state when', () => {
        const instance = mountedObj.instance();
        const expected = ['react', 'tests'];
        instance.updateTags(null, { value: expected });

        chai.expect(instance.state.tags)
          .to.equal(expected);
      });
    });
  });
});
