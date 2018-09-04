import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import UserArticles from '../../src/views/articles/UserArticles';

describe('testing NewArticle Copmonent', () => {
  describe('basic components it renders', () => {
    it('should render an EditArticleControls component ', () => {
      const mountedObj = shallow(<UserArticles />);
      expect(mountedObj)
        .toMatchSnapshot();
    });
  });
});
