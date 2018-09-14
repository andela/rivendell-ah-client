import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import NewArticle from '../../src/views/articles/NewArticle';
import EditArticleControls from '../../src/components/EditArticleControls';

describe('testing NewArticle Copmonent', () => {
  it('should render an EditArticleControls component ', () => {
    const mountedObj = shallow(<NewArticle />);
    chai.expect(mountedObj.find(EditArticleControls).length)
      .to.equal(1);
  });

  it('should render an EditArticleControls component ', () => {
    const mountedObj = shallow(<NewArticle />);
    expect(mountedObj)
      .toMatchSnapshot();
  });
});
