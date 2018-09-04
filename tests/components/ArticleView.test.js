
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Container, Header } from 'semantic-ui-react';
import { ArticleView, mapStateToProps, mapDispatchToProps } from '../../src/components/ArticleView';


const getMountedObj = (slug = '') => shallow(<ArticleView slug={slug} />);
describe('testing the AticleView Component', () => {
  describe('the conponents that it renders', () => {
    it('should contain a semantic-ui-react Containser', () => {
      chai.expect(getMountedObj().find(Container).length)
        .to.equal(2);
    });

    it('should contain a semantic-ui-react Containser', () => {
      chai.expect(getMountedObj().find(Header).length)
        .to.equal(1);
    });
  });

  describe('testing moethods in the component', () => {
    it('should call the componentDidMount method', () => {
      const spy = jest.spyOn(ArticleView.prototype, 'componentDidMount');
      getMountedObj();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe('mapSTateToProps', () => {
    it('should map the article to the props', () => {
      const dummyState = {
        loadArticleReducer: { article: {} }
      };

      const props = mapStateToProps(dummyState);

      chai.expect(props.article)
        .to.equal(dummyState.loadArticleReducer.article);
    });
  });
  describe('mapDispatchToProps', () => {
    it('should the specified functions to props', () => {
      const dispatchSpy = jest.fn();
      const props = mapDispatchToProps(dispatchSpy);

      chai.expect(props.loadArticle)
        .to.be.a('function');
      props.loadArticle();
      expect(dispatchSpy)
        .toHaveBeenCalled();
    });
  });
});
