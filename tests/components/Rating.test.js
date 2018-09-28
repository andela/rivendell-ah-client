import React from 'react';
import { shallow } from 'enzyme';
import store from '../../src/store';
import { ArticleRating, mapStateToProps } from '../../src/views/articles/rating/ArticleRating';
import { PopupRaters } from '../../src/views/articles/rating/PopupRaters';

const event = {
  preventDefault: ()=> 'event',
  target: {
    value: 'mppdgr@gmail.com',
  }
}

const history = {
  replace: (pathname) => pathname,
  push: (path) => 'redirected to ' + path
}

const location = {
  search: '',
  pathname: ''
} 
const user = {
  id: ''
}

const dispatch = (action) => action

const articleSlug="another-article-a94492b0-bb88-11e8-8318-1d84958055c1";

const articleRating = shallow(
<ArticleRating
  articleSlug={articleSlug}
  user={user}
  dispatch={store.dispatch}
  isRated={true}
  history={history}
  raters={3}
  myRating={0}
  averageRating={3}
  ratersInfo={[]}
  />
  )

describe('ArticleRating Component', () => {
  it('should render without throwing an error', () => {
    expect(articleRating.find('Rating').exists()).toBe(true);
  })

  it('should fetch all ratings of an article on startup', () => {
    const instance = articleRating.instance();
    instance.ratings.hasFetched = false;
    instance.componentDidUpdate();
    expect(instance.ratings.hasFetched).toBe(true);
  })

  it('should redirect a non-login user to the login page if he attempt to rate an article', () => {
    const instance = articleRating.instance();
    instance.ratings.hasFetched = false;
    localStorage.removeItem('token');
    instance.handleArticleRating(event, { rating: 3 });
    expect(instance.props.history.push('/login')).toBe('redirected to /login');
  })

  it('should be able to rate an article if user is logged in', () => {
    const instance = articleRating.instance();
    instance.ratings.hasFetched = true;
    localStorage.setItem('token', 'thetokenvalue')
    instance.handleArticleRating(event, { rating: 3 });
    expect(instance.ratings.hasFetched).toBe(false);
  })

  it('should show more raters if the show more button is clicked', () => {
    const instance = articleRating.instance();
    const end = instance.state.end;
    instance.handleShowMore(event);
    expect(instance.state.end).toBe(end + 1);
  })

  it('should display raters on the top list if previous icon is clicked', () => {
    const instance = articleRating.instance();
    instance.setState({start: 2, end: 4});
    const start = instance.state.start;
    instance.handleShowPrevious(event);
    expect(instance.state.start).toBe(start - 1);
  })

  it('should not move list if no more items to display', () => {
    const instance = articleRating.instance();
    instance.setState({start: 0, end: 2});
    instance.handleShowPrevious(event);
    expect(instance.state.start).toBe(0);
  })

 })

  describe('ArticleRating mapStateToProps', () => {
    it('should map the state to the props correctly', () => {
      const state = {
        averageRating: 0,
        isLoading: true,
        isRated: false,
        message: "",
        myRating: 0,
        raters: 0,
        ratersInfo: [],
        user: {}
      };
      expect(mapStateToProps(store.getState())).toEqual(state);
    });
  });

  describe('PopupRaters mapStateToProps', () => {
    it('should render without throwing an error', () => {

      expect(shallow(<PopupRaters trigger={{}} content={[]}/>).find('Popup').exists()).toBe(true);
    })
  });

