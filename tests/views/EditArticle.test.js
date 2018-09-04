import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { EditArticle, mapStateToProps, mapDispatchToProps } from '../../src/views/articles/EditArticle';

describe('testing NewArticle Copmonent', () => {
  describe('basic components it renders', () => {
    it('should render an EditArticleControls component ', () => {
      const mountedObj = shallow(<EditArticle />);
      expect(mountedObj)
        .toMatchSnapshot();
    });
  });


  describe('functions in the comonent', () => {
    it('should call persistArticle with its argument', () => {
      const updateArticleSpy = jest.fn();
      const mockSlug = { slug: 'mockSlug' };
      const mountedObj = shallow(
        <EditArticle
          updateArticle={updateArticleSpy}
          match={{ params: mockSlug }}
        />
      );
      const expectedArg = 'expect this argumet';
      mountedObj.instance().handleSubmit(expectedArg);
      expect(updateArticleSpy)
        .toHaveBeenCalledWith(expectedArg, mockSlug.slug);
    });
  });

  describe('mapStateToProps', () => {
    it('mapStateToProps should correctly map the state passed as argument', () => {
      const state = {
        updateArticleReducer: {success: true},
        loadArticleReducer: {article: 'mockArticle'}
      };
      const mappedState = mapStateToProps(state);

      chai.expect(mappedState.success)
        .to.equal(state.updateArticleReducer.success);
        chai.expect(mappedState.loadedArticle)
        .to.equal(state.loadArticleReducer.article);
    });
  });

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps should correctly map the state passed as argument', () => {
      const dispatchSpy = jest.fn();
      const mappedState = mapDispatchToProps(dispatchSpy);

      chai.expect(mappedState.updateArticle)
        .to.be.a('function');
      const expectArg = 'this argument';
      mappedState.updateArticle(expectArg);
      expect(dispatchSpy)
        .toHaveBeenCalledTimes(1);
    });

    it('mapDispatchToProps should correctly map the state passed as argument', () => {
      const dispatchSpy = jest.fn();
      const mappedState = mapDispatchToProps(dispatchSpy);

      chai.expect(mappedState.loadArticle)
        .to.be.a('function');
      const expectArg = 'this argument';
      mappedState.loadArticle(expectArg);
      expect(dispatchSpy)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('defaultProps', () => {
    it('should have a persist article that is an empty functuon', () => {
      chai.expect(EditArticle.defaultProps.updateArticle)
        .to.be.a('function');
      chai.expect(EditArticle.defaultProps.updateArticle())
        .to.equal(undefined);
    });
  });
});
