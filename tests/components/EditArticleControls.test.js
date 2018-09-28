
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Button , Message} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { EditArticleControls, mapDispatchToProps, mapStateToProps } from '../../src/components/EditArticleControls';
import CategoryInput from '../../src/components/CategoryInput';
import TagInput from '../../src/components/TagInput';

describe('Testing EditArticleControls', () => {
  let mountedObj;
  const emptyFunction = () => {};

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
    resetPage,
    success = false,
    onSubmit = emptyFunction,
    errors = {},
  ) => shallow(<EditArticleControls
    persistArticle={emptyFunction}
    loadCategories={emptyFunction}
    resetPage={resetPage}
    categories={categories}
    uploadImage={emptyFunction}
    {...articleState}
    success={success}
    onSubmit={onSubmit}
    errors={errors}
    update
  />);
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
        .to.equal(2);
    });

    it('should render  a Redirect component when success is equal to true', () => {
      mountedObj = getMountedObj(undefined, undefined, undefined, true);
      const redirectObj = mountedObj.find(Redirect);
      chai.expect(redirectObj.length)
        .to.equal(1);
      chai.expect(redirectObj.prop('to'))
        .to.be.a('string');
    });
  });

  describe('the  mapStateToProps and mapDispatchToProps', () => {
    it('mapStateToProps should correctly map the state passed as argument', () => {
      const state = {
        loadCategoriesReducer: { categories: [] },
        uploadImageReducer: { isLoading: false },
        createArticleReducer: { isLoading: false },
        profile: { userProfile: 'tempProfile' },
      };
      const mappedState = mapStateToProps(state);

      chai.expect(mappedState.categories)
        .to.equal(state.loadCategoriesReducer.categories);
      chai.expect(mappedState.isLoading)
        .to.equal(false);
    });

    it('mapDispatchToProps should map the correct values', () => {
      const dispatchObj = {
        dispatch: () => {}
      };
      const dispatchSpy = jest.spyOn(dispatchObj, 'dispatch');
      const mappedObj = mapDispatchToProps(dispatchObj.dispatch);
      mappedObj.loadCategories();
      mappedObj.resetPage();
      expect(dispatchSpy).toHaveBeenCalledTimes(3);
    });
  });


  describe('defaultProps', ()=>{
    it('should have a resetPage method that ', ()=>{
      chai.expect(EditArticleControls.defaultProps)
      .property('resetPage')
      .to.be.a('function');
      EditArticleControls.defaultProps.resetPage();

    });
    it('should have a uploadImage method that ', ()=>{
      chai.expect(EditArticleControls.defaultProps)
      .property('uploadImage')
      .to.be.a('function');
      chai.expect(EditArticleControls.defaultProps.uploadImage())
      .to.equal(undefined);

    });
  })
  describe('the functions contained in the object', () => {
    describe('componentDidMount()', () => {
      it('should call componentDidMount after the component has been mounted', () => {
        const spy = jest.spyOn(EditArticleControls.prototype, 'componentDidMount');
        mountedObj = getMountedObj();
        expect(spy).toHaveBeenCalled();
      });
      it('should call the imageFileReader.addEventListener function, ', () => {
        mountedObj = getMountedObj();
        const spy = jest.spyOn(mountedObj.instance().imageFileReader, 'addEventListener');
        mountedObj.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('componentWillReceiveProps', ()=>{
      it('should be called when the props change', ()=>{
        const spy = jest.spyOn(EditArticleControls.prototype, 'componentWillReceiveProps');
        mountedObj = getMountedObj();
       
       mountedObj.setProps({Categories:['new category']});
        expect(spy).toHaveBeenCalled();
      });
      it('should call setState when the new prop contains a article with a new slug', ()=>{
        const spy = jest.spyOn(EditArticleControls.prototype, 'setState');
        mountedObj = getMountedObj();
       
       mountedObj.setProps({article: {slug: 'newSlug'}});
        expect(spy).toHaveBeenCalled();
      })
    })


    describe('when error object is passed as prop', ()=>{
      it('should render a semantic-ui-react Message compnent',()=>{
        const errors =  {
          title :['please enter error'],
          description: ['error description'],
          body:['error body']
        }
        mountedObj= getMountedObj(undefined,undefined,undefined,undefined,undefined,errors);
        chai.expect(mountedObj.find(Message).length)
        .to.equal(1);
      } )
    });
    describe('createImageFileRef', ()=>{
      it('should set the fileInput property ', ()=>{
          mountedObj= getMountedObj();
          const expected = 'this should be in fileInput';
          mountedObj.instance().createImageFileRef(expected);
          chai.expect(mountedObj.instance().fileInput)
          .to.equal(expected);
      });
      
    })
   
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

        const spy = jest.fn();
        mountedObj = getMountedObj(undefined,undefined,undefined,undefined,spy);
       mountedObj.find('#submit-button')
          .simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('image change simulation', () => {
      it('should call the handleImageChange function', () => {
        const spy = jest.spyOn(EditArticleControls.prototype, 'handleImageChange');
        mountedObj = getMountedObj();
        const fileReaderSpy = jest.spyOn(mountedObj.instance().imageFileReader, 'readAsDataURL');
        mountedObj.find('input[type="file"]')
          .simulate('change', { target: { files: [new Blob()] } });
        expect(spy).toHaveBeenCalled();
        expect(fileReaderSpy).toHaveBeenCalled();
      });

      it('should call handleImageChange when the select inage button is clicked', () => {
        const spy = jest.spyOn(EditArticleControls.prototype, 'selectImage');
        mountedObj = getMountedObj();
        mountedObj.find('#file-button')
          .simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('switchToEditing()', () => {
      it('should call editing', () => {
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
        const expected = 'Testing in ReactJS ';
        instance.updateTitle(null, { value: expected });

        chai.expect(instance.state.title)
          .to.equal(expected.toUpperCase());
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
