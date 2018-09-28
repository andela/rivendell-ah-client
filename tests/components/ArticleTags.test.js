import { shallow } from "enzyme";
import React from "react";

import { ArticleTags, mapStateToProps } from "../../src/views/articles/ArticleTags";
import mockData from '../config/mockData';

const { searchParams } = mockData;

describe("The ArticleTag component", () => {
  describe("Testing mapStateToProps", () => {
    it("should map the state to the props correctly", () => {
      const state = {
        articlesByTags: {
        isLoading: false,
        errors: {},
        articles: ['a', 'b','c'],
        }
      };
      const expectedResult = {
        isLoading: false,
        errors: {},
        articles: ['a', 'b','c'],
      }
  
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual(expectedResult);
    });
  });

  describe('ArticleTags', () => {
    it('It should render articles by tags', () => {
      const articles = [{body: '', tags: ['a', 'b']}, {body: '', tags: ['a', 'b']},];
      const match = {
        params: '',
      }
      const dispatch = jest.fn();
      const wrapper = shallow(<ArticleTags articles={articles}
      match={match}
      dispatch={dispatch} />);
      const parentDiv = wrapper.find('.central');
      expect(parentDiv.length).toBe(1);
    })
  })

  
});
