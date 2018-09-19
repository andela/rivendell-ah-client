import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Item, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import articleAction from '../../actions/articleAction';
import likeAction from '../../actions/likeAction';
import ArticleView from '../../components/ArticleView';

/**
 * Article Component
 */
export class Article extends React.Component {
  /**
   * constructor function
   */
  constructor() {
    super();
    this.state = {
      likeAttributes: {
        divClass: 'ui labeled button',
        buttonClass: 'ui button',
        iconClass: 'heart icon',
        linkClass: 'ui basic left pointing label'
      },
      start: 0,
      end: 2,
      range: 2,
      showPreviousIcon: false,
      disableShowMore: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkUserLikes = this.checkUserLikes.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.renderLikeBy = this.renderLikeBy.bind(this);
    this.onShowPrevious = this.onShowPrevious.bind(this);
  }

  /**
  * ComponentDidMount lifecycle
  * @returns {string} - HTML Markup for the component
  */
  componentDidMount() {
    const { match, getArticle } = this.props;
    const { params } = match;
    // dispatch an article (an example just to test the like functionality)
    getArticle(params.slug);
  }

  /**
  * componentWillReceiveProps lifecycle
  * @returns {string} - HTML Markup for the component
  * @param {object} nextProps
  */
  componentWillReceiveProps(nextProps) {
    const { match } = this.props;
    const { params } = match;
    if (nextProps.like[params.slug]
      || this.checkUserLikes(nextProps.likes)) {
      this.setState({
        likeAttributes: {
          divClass: 'ui labeled button',
          buttonClass: 'ui blue button',
          iconClass: 'heart icon',
          linkClass: 'ui basic left pointing label'
        }
      });
    } else {
      this.setState({
        likeAttributes: {
          divClass: 'ui labeled button',
          buttonClass: 'ui button',
          iconClass: 'heart icon',
          linkClass: 'ui basic left pointing label'
        }
      });
    }
  }


  /**
  * ComponentDidUpdate lifecycle
  * @returns {string} - HTML Markup for the component
  * @param {object} prevProps
  * @param {object} prevState
  */
  componentDidUpdate(prevProps) {
    const { article, getLikes, like, match } = this.props;
    const { params } = match;
    if (article.likes !== prevProps.article.likes
      || like !== prevProps.like) {
      getLikes(params.slug);
    }
  }


  /**
  * onLoadmore
  * @returns {null} - Returns null
  */
  onLoadMore() {
    const { likesCount } = this.props;
    let { start, end,
      showPreviousIcon, disableShowMore
    } = this.state;
    const { range } = this.state;
    end += 1;
    if (end - start > range) start += 1;
    if (end >= likesCount) {
      end = likesCount;
      disableShowMore = true;
    }
    if (start > 0) {
      showPreviousIcon = true;
    }
    this.setState({
      start,
      end,
      showPreviousIcon,
      disableShowMore
    });
  }

  /**
 * onShowPrevious
 * @returns {null} - Returns null
 */
  onShowPrevious() {
    const { likesCount } = this.props;
    let { start, end,
      showPreviousIcon, disableShowMore
    } = this.state;
    const { range } = this.state;
    if (start === 0) return;
    start -= 1;
    if (end - start > range) end -= 1;
    if (start <= 0) {
      start = 0;
      showPreviousIcon = false;
    }
    if (end < likesCount) disableShowMore = false;
    this.setState({
      start,
      end,
      showPreviousIcon,
      disableShowMore
    });
  }

  /**
    * checkUserLikes
    * @returns {boolean} - HTML Markup for the component
    * @param {Array} likes
    */
  checkUserLikes(likes) {
    const { userProfile } = this.props;
    return likes.some(like => like.user.id === userProfile.id);
  }

  /**
   * handle form submit
   * @param {Object} event event object
   * @returns {null} null
   */
  handleClick() {
    const {
      match, token, history,
      likeArticle, unlikeArticle,
      like, likes,
    } = this.props;
    const { params } = match;
    if (token) {
      if (!like[params.slug] && !this.checkUserLikes(likes)) {
        likeArticle(params.slug, token);
      } else {
        unlikeArticle(params.slug, token);
      }
    } else {
      history.push('/login');
    }
  }

  /**
  * renderLikeby
  * @returns {jsx} - HTML Markup for the component
  */
  renderLikeBy() {
    const { likes } = this.props;
    const { start, end, disableShowMore, showPreviousIcon } = this.state;
    const list = likes.length > 0
      ? likes.slice(start, end).map((likedBy, index) => (
        <Item key={index}>
          {likedBy.user.image ? (
            <Item.Image
              size="tiny"
              src={likedBy.user.image}
            />
          )
            : (
              <Icon
                size="massive"
                name="user"
                color="blue"
              />
            )}

          <Item.Content>
            <Item.Header>
              <Link to={`/@${likedBy.user.username}`}>
                {`${likedBy.user.firstName} 
              ${likedBy.user.lastName}`}
              </Link>
            </Item.Header>
            <Item.Meta>Bio</Item.Meta>
            <Item.Description>
              {likedBy.user.bio
                ? likedBy.user.bio : 'No Bio Info'}
            </Item.Description>
            <Item.Extra>
              {`Liked: ${likedBy.timeLiked.substring(0, 10)}`}
            </Item.Extra>
          </Item.Content>
        </Item>
      )) : ' ';
    return typeof list === 'object'
      ? (
        <div>
          <Item.Group>
            <div
              className={showPreviousIcon
                ? 'show-more' : 'hide'}
            >
              <Icon
                className="pointer"
                color="blue"
                name="chevron up"
                size="large"
                onClick={this.onShowPrevious}
              />
            </div>
            <h5 className="likes-header">
              Users Who Liked
            </h5>
            {list}
            <div
              className="show-more"
            >
              <Button
                color="blue"
                className="ui button"
                onClick={this.onLoadMore}
                disabled={disableShowMore}
                basic
              >
                Show More...
              </Button>
            </div>

          </Item.Group>
        </div>
      ) : 'No Likes';
  }

  /**
 * render function
 * @returns {Function} jsx
 */
  render() {
    const { likeAttributes } = this.state;
    const { likesCount, likes, match: { params }, history } = this.props;
    const likeProps = {
      likeAttributes,
      likesCount,
      handleClick: this.handleClick,
      likes,
      renderLikeBy: this.renderLikeBy,
      onLoadMore: this.onLoadMore,
    };
    return (
      <div>
        <ArticleView
          history={history}
          slug={params.slug}
          likeProps={likeProps}
        />
      </div>
    );
  }
}
export const mapStateToProps = (state) => {
  const { article } = state.article;
  const { token } = state.auth;
  const { userProfile } = state.profile;
  const { likes, like, likesCount } = state.like;
  return {
    article,
    userProfile,
    likes,
    like,
    likesCount,
    token,
  };
};
Article.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  likesCount: PropTypes.number,
  getArticle: PropTypes.func.isRequired,
  getLikes: PropTypes.func,
  like: PropTypes.shape({}),
  userProfile: PropTypes.shape({
    id: PropTypes.string,
  }),
  likes: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.object
  })),
  article: PropTypes.shape({
    likes: PropTypes.array,
  }),
  token: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  likeArticle: PropTypes.func,
  unlikeArticle: PropTypes.func,

};
Article.defaultProps = {
  likesCount: 0,
  getLikes: () => { },
  userProfile: {},
  likes: [],
  like: {},
  article: PropTypes.shape({
    likes: [],
  }),
  token: '',
  history: {},
  likeArticle: () => { },
  unlikeArticle: () => { },
};
export default connect(mapStateToProps, {
  getArticle: articleAction.getArticle,
  getLikes: likeAction.getLikes,
  likeArticle: likeAction.likeArticle,
  unlikeArticle: likeAction.unlikeArticle,
})(Article);
