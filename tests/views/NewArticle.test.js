import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { NewArticle, mapStateToProps, mapDispatchToProps } from '../../src/views/articles/NewArticle';

describe('testing NewArticle Copmonent', () => {
  describe('basic components it renders', () => {
    it('should render an EditArticleControls component ', () => {
      const mountedObj = shallow(<NewArticle />);
      expect(mountedObj)
        .toMatchSnapshot();
    });
  });


  describe('functions in the comonent', () => {
    it('should call persistArticle with its argument', () => {
      const persistArticleSpy = jest.fn();
      const mountedObj = shallow(
        <NewArticle persistArticle={persistArticleSpy} />
      );
      const expectedArg = 'expect this argumet';
      mountedObj.instance().handleSubmit(expectedArg);
      expect(persistArticleSpy)
        .toHaveBeenCalledWith(expectedArg);
    });
  });

  describe('mapStateToProps', () => {
    it('mapStateToProps should correctly map the state passed as argument', () => {
      const state = {
        createArticleReducer: 'Hello code'
      };
      const mappedState = mapStateToProps(state);

      chai.expect(mappedState.storeState)
        .to.equal(state.createArticleReducer);
    });
  });

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps should correctly map the state passed as argument', () => {
      const dispatchSpy = jest.fn();
      const mappedState = mapDispatchToProps(dispatchSpy);

      chai.expect(mappedState.persistArticle)
        .to.be.a('function');
      const expectArg = 'this argument';
      mappedState.persistArticle(expectArg);
      expect(dispatchSpy)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('defaultProps', () => {
    it('should have a persist article that is an empty functuon', () => {
      chai.expect(NewArticle.defaultProps.persistArticle)
        .to.be.a('function');
      chai.expect(NewArticle.defaultProps.persistArticle())
        .to.equal(undefined);
    });
  });
});
