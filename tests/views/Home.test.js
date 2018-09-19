import { shallow } from 'enzyme';
import React from 'react';
import { Home, mapStateToProps } from '../../src/views/Home';

const props = {
  getArticles: () => {},
  updateActivePage: () => {},
  featArticlesLimit: 4,
  featArticlesActivePage: 1,
  feetArticlesPageCount: 4,
  feedPageCount: 3,
  feedActivePage: 1,
  feedLimit: 4,
  token: 'token',
  history: {
    push: () => {}
  },
  feedArticles: {
    1: [{
      slug: 'slug',
      title: 'title',
      description: 'description',
      author: {
        username: 'username'
      }
    }]
  },
  nextArticle: {
    1: {
      display: 'none'
    }
  },
  featuredArticles: {
    1: [{
      slug: 'slug',
      title: 'title',
      description: 'description',
      author: {
        username: 'username'
      }
    }]
  },
  topRatedArticles: [{
    slug: 'slug',
    title: 'title',
    description: 'description',
    author: {
      username: 'username'
    }
  }],
  favoriteArticles: [{
    id: 'id',
    article: {
      slug: 'slug',
      title: 'title',
      description: 'description',
      author: {
        username: 'username'
      }
    }
  }],
  categories: [{
    name: 'SPORTS',
    subcategories: [{
      name: 'football',
      id: 'id'
    }]
  }],
  getCategories: () => {},
  getTopRated: () => {},
  getFeed: () => {},
  getFavoriteArticles: () => {},
  displayNextFavoriteArticle: () => {},
  topRatedIsLoading: false,
  favArticleIsLoading: false,
  categoriesIsLoading: false,
  featArticlesIsLoading: false,
  feedIsLoading: false,
}
const shallowRender = () => shallow(<Home { ...props } />);

describe('The Login component', () => {
  describe('Testing mapStateToProps', () => {
    it('should map the state to the props correctly', () => {
      const state = {
        featuredArticles: {
          errors: {
            message: ''
          },
          limit: 4,
          activePage: 1,
          featuredArticles: {
            1: [{
              slug: 'slug'
            }]
          },
          isLoading: false,
          articlesCount: 3,
        },
        auth: {
          token: '',
        },
        feed: {
          errors: {
            message: ''
          },
          limit: 4,
          activePage: 1,
          feedArticles: {
            1: [{
              slug: 'slug'
            }]
          },
          isLoading: false,
          articlesCount: 3,
        },
        auth: {
          token: '',
        },
        favoriteArticles: {
          favoriteArticles: {
            1: [{
              slug: 'slug'
            }]
          },
          nextArticle: {
            1: {
              display: 'none'
            }
          },
        },
        categories: {
          categories: [{
            name: 'SPORTS',
          }],
        },
        topRated:{
            topRatedArticles: [{
            slug: 'slug'
          }],
        }
      };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual({
        featArticlesErrors: state.featuredArticles.errors,
        featArticlesLimit: state.featuredArticles.limit,
        featArticlesActivePage: state.featuredArticles.activePage,
        feetArticlesPageCount: Math
          .ceil(state.featuredArticles.articlesCount / state.featuredArticles.limit),
        featArticlesCount: state.featuredArticles.articlesCount,
        featuredArticles: state.featuredArticles.featuredArticles,
        featArticlesIsLoading: state.featuredArticles.isLoading,
        categories: state.categories.categories,
        topRatedArticles: state.topRated.topRatedArticles,
        feedErrors: state.feed.errors,
        feedLimit: state.feed.limit,
        feedActivePage: state.feed.activePage,
        feedArticles: state.feed.feedArticles,
        feedIsLoading: state.feed.isLoading,
        feedPageCount: Math.ceil(state.feed.articlesCount / state.feed.limit),
        favoriteArticles: state.favoriteArticles.favoriteArticles,
        token: state.auth.token,
        nextArticle: state.favoriteArticles.nextArticle,
      });
    });
  });
  describe('Testing component methods', () => {
    const homeComponent = shallowRender();
    describe('Testing componentDidMount', () => {
      it('should call componentDidMount on loading the page', () => {
        jest.spyOn(Home.prototype, 'componentDidMount');
        shallowRender();
        expect(Home.prototype.componentDidMount.mock.calls.length).toEqual(1);
      });
      it('should call componentDidMount on loading the page', () => {
        const props1 = { ...props };
        props1.feedArticles = {};
        jest.spyOn(Home.prototype, 'componentDidMount');
        shallow(<Home { ...props1} />);
        expect(Home.prototype.componentDidMount.mock.calls.length).toEqual(2);
      });
      it('should call componentDidMount on loading the page', () => {
        const props1 = { ...props };
        props1.featuredArticles = {};
        props1.token = '';
        jest.spyOn(Home.prototype, 'componentDidMount');
        shallow(<Home { ...props1} />);
        expect(Home.prototype.componentDidMount.mock.calls.length).toEqual(3);
      });
    });
    describe('Testing handle Pagination Change function', () => {
      it('should reset the article image style in the state', () => {
        const e = {};
        const homeComponentInstance = homeComponent.instance();
        homeComponentInstance.handlePaginationChange(e, { activePage: 1});
        expect(homeComponentInstance.state.articleImgStyles).toEqual({
          animation: '',
          bottom: '',
          top: '',
        });
        homeComponentInstance.handlePaginationChange(e, { activePage: 2 });
        expect(homeComponentInstance.state.articleImgStyles).toEqual({
          animation: '',
          bottom: '',
          top: '',
        });
      });
      it('should reset the article image style in the state', () => {
        const props1 = { ...props} ;
        props1.token = '';
        const e = {
          activePage: 1
        }
        const homeComponentInstance = shallow(<Home { ...props1 } />).instance();
        homeComponentInstance.handlePaginationChange(e, { activePage: 1});
        expect(homeComponentInstance.state.articleImgStyles).toEqual({
          animation: '',
          bottom: '',
          top: '',
        });
        homeComponentInstance.handlePaginationChange(e, { activePage: 2 });
        expect(homeComponentInstance.state.articleImgStyles).toEqual({
          animation: '',
          bottom: '',
          top: '',
        });
      });
    });
    describe('Testing slideDown function', () => {
      it('should update the articleImgStyles state', () => {
        const homeComponentInstance = homeComponent.instance();
        homeComponentInstance.slideDown(1);
        expect(homeComponentInstance.state.articleImgStyles).toEqual({
          1: {
            animation: 'slide-down 0.3s',
          }
        });
      });
    });
    describe('Testing slideUp function', () => {
      it('should update the articleImgStyles state', () => {
        const homeComponentInstance = homeComponent.instance();
        homeComponentInstance.slideUp(1);
        expect(homeComponentInstance.state.articleImgStyles).toEqual({
          1: {
            animation: 'slide-up 0.3s',
            bottom: '0px'
          }
        });
      });
    });
    describe('Testing getNextArticle function', () => {
      it('should be called', () => {
        const homeComponentInstance = homeComponent.instance();
        homeComponentInstance.getNextArticle(1, [1, 2]);
        homeComponentInstance.getNextArticle(1, []);
      });
    });
    describe('Testing subcategoryClick function', () => {
      it('Should be called', () => {
        const homeComponentInstance = homeComponent.instance();
        homeComponentInstance.subcategoryClick();
      })
    })
  });
});
