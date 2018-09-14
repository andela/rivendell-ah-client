
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Button } from 'semantic-ui-react';
import { EditArticleControls, mapDispatchToProps, mapStateToProps } from '../../src/components/EditArticleControls';
import CategoryInput from '../../src/components/CategoryInput';
import TagInput from '../../src/components/TagInput';
import ErrorMessagePortal from '../../src/components/ErrorMessagePortal';

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
    categories = [],
    clearErrors,
  ) => {
    const emptyFunction = () => {};
    return shallow(<EditArticleControls
      persistArticle={emptyFunction}
      loadCategories={emptyFunction}
      clearErrors={clearErrors}
      categories={categories}
      {...articleState}
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
      chai.expect(mountedObj.find(Button).length)
        .to.equal(1);
    });

    it('should render an ErrorMessagePortal', () => {
      chai.expect(mountedObj.find(ErrorMessagePortal).length)
        .to.equal(1);
    });
  });

  describe('the props of ErrorMessagePortal it renders', () => {
    it('should contain an error message of length 0 when no error occured', () => {
      const errorPortal = mountedObj.find(ErrorMessagePortal);
      chai.expect(errorPortal.prop('errorMessages'))
        .to.be.an('array')
        .lengthOf(0);
    });
    it('should contain an error message of length greater than 0 when an error occured', () => {
      const mountedObjWithErrors = getMountedObj({
        ...initialArticleState,
        errors: {
          title: ['error'],
          body: ['arr', 'of'],
          description: ['arr']
        }
      });
      const errorPortal = mountedObjWithErrors.find(ErrorMessagePortal);
      chai.expect(errorPortal.prop('errorMessages').length)
        .to.be.greaterThan(0);
    });
  });

  describe('the  mapStateToProps and mapDispatchToProps', () => {
    it('mapStateToProps should correctly map the state passed as argument', () => {
      const state = {
        createArticleReducer: { data: 'dummyValue' },
        loadCategoriesReducer: { categories: [] }
      };
      const mappedState = mapStateToProps(state);
      chai.expect(mappedState.categories)
        .to.equal(state.loadCategoriesReducer.categories);
      chai.expect(mappedState.data)
        .to.equal(state.createArticleReducer.data);
    });

    it('mapDispatchToProps should map the correct values', () => {
      const dispatchObj = {
        dispatch: () => {}
      };
      const dispatchSpy = jest.spyOn(dispatchObj, 'dispatch');
      const mappedObj = mapDispatchToProps(dispatchObj.dispatch);
      mappedObj.persistArticle();
      mappedObj.loadCategories();
      mappedObj.clearErrors();
      expect(dispatchSpy).toHaveBeenCalledTimes(3);
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

    describe('switchToEditing()', () => {
      it('shouldcall editing', () => {
        const spy = jest.fn();
        mountedObj = getMountedObj(undefined, undefined, spy);
        const instance = mountedObj.instance();
        instance.switchToEditing();
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
