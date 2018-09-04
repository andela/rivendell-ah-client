import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import Article from '../../src/views/articles/Article';

describe('testing NewArticle Copmonent', () => {
  describe('basic components it renders', () => {
    it('should render an EditArticleControls component ', () => {
      const mountedObj = shallow(<Article />);
      expect(mountedObj)
        .toMatchSnapshot();
    });
  });
});
