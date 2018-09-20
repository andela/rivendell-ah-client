import React from 'react';
import { Item, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Like from '../../components/Like';
import articleAction from '../../actions/articleAction';
import likeAction from '../../actions/likeAction';

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
      limit: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkUserLikes = this.checkUserLikes.bind(this);
    this.handleCountClick = this.handleCountClick.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.renderLikeBy = this.renderLikeBy.bind(this);
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
    console.log('props', this.props);
    console.log('nextProps', nextProps);
    const { user } = this.props;

    if (nextProps.like || this.checkUserLikes(nextProps.likes)) {
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
  componentDidUpdate(prevProps, prevState) {
    const { article, getLikes, like, match } = this.props;
    const { params } = match;
    if (article.likes !== prevProps.article.likes
      || like !== prevProps.like) {
      getLikes(params.slug);
    }
  }


  /**
  * onloadmore
  * @returns {null} - HTML Markup for the component
  */
  onLoadMore() {
    const { limit } = this.state;
    this.setState({
      limit: limit + 1
    });
  }


  /**
    * checkUserLikes
    * @returns {boolean} - HTML Markup for the component
    * @param {Array} likes
    */
  checkUserLikes(likes) {
    const { user } = this.props;
    return likes.some(like => like.user.id === user.id);
  }

  /**
   * handle form submit
   * @param {Object} event event object
   * @returns {null} null
   */
  handleClick(event) {
    const { match, token, history, user, likeArticle, unlikeArticle, like, likes } = this.props;
    const { params } = match;
    console.log(user);
    if (token) {
      if (!like && !this.checkUserLikes(likes)) {
        likeArticle(params.slug, user.token);
      } else {
        unlikeArticle(params.slug, user.token);
      }
    } else {
      history.push('/login');
    }
    // getArticle(params.slug);
  }


  /**
   * handle form submit
   * @param {Object} event event object
   * @returns {null} null
   */
  handleCountClick(event) {
    const { token, history } = this.props;
    if (!token) {
      history.push('/login');
    }
  }

  /**
  * renderLikeby
  * @returns {jsx} - HTML Markup for the component
  */
  renderLikeBy() {
    const { likes } = this.props;
    const { limit } = this.state;
    const list = likes.length > 0 ? likes.slice(0, limit).map((likedBy, index) => (
      <Item key={index}>
        <Item.Image
          size="tiny"
          src={likedBy.user.image
            ? likedBy.user.image
            : 'https://react.semantic-ui.'
            + 'com/images/wireframe/image.png'}
        />

        <Item.Content>
          <Item.Header as="a">
            {`${likedBy.user.firstName} ${likedBy.user.lastName}`}
          </Item.Header>
          <Item.Meta>Bio</Item.Meta>
          <Item.Description>
            {likedBy.user.bio ? likedBy.user.bio : 'No Bio Info'}

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
            {list}
            <Button className="ui blue button" onClick={this.onLoadMore}>
              Load More
            </Button>
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
    const { article, likesCount, likes } = this.props;
    console.log('component rendered with ', article);

    return (
      <div>
        <div>
          <h2>
            Title:
            {article.title}
          </h2>
        </div>
        <br />
        <div>
          <h3>
            Body:
            {article.body}
          </h3>
        </div>
        <br />
        <div>
          <h3>
            Description:
            {article.description}
          </h3>
        </div>
        <br />
        <div>
          <h3>
            Published:
            {article.createdAt}
          </h3>
        </div>
        <br />
        <Like
          likeAttributes={likeAttributes}
          likesCount={likesCount}
          handleClick={this.handleClick}
          handleCountClick={this.handleCountClick}
          likes={likes}
          renderLikeBy={this.renderLikeBy}
          onLoadMore={this.onLoadMore}
        />
      </div>
    );
  }
}
export const mapStateToProps = (state) => {
  const { article } = state.article;
  const { user, token } = state.auth;
  const { likes, like, likesCount } = state.like;
  return {
    article,
    user,
    likes,
    like,
    likesCount,
    token,
  };
};
export default connect(mapStateToProps, {
  getArticle: articleAction.getArticle,
  getLikes: likeAction.getLikes,
  likeArticle: likeAction.likeArticle,
  unlikeArticle: likeAction.unlikeArticle,
})(Article);
