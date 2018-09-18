import React from 'react';
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
    };
    this.handleClick = this.handleClick.bind(this);
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
    if (nextProps.like) {
      this.setState({ likeAttributes: {
        divClass: 'ui labeled button',
        buttonClass: 'ui blue button',
        iconClass: 'heart icon',
        linkClass: 'ui basic left pointing label'
      } });
    } else {
      this.setState({ likeAttributes: {
        divClass: 'ui labeled button',
        buttonClass: 'ui button',
        iconClass: 'heart icon',
        linkClass: 'ui basic left pointing label'
      } });
    }
  }

  /**
  * ComponentDidUpdate lifecycle
  * @returns {string} - HTML Markup for the component
  * @param {object} prevProps
  * @param {object} prevState
  */
  componentDidUpdate(prevProps, prevState) {
    const { article, storeLikes } = this.props;
    if (article.likes !== prevProps.article.likes) {
      storeLikes(article);
    }
  }

  /**
   * handle form submit
   * @param {Object} event event object
   * @returns {null} null
   */
  handleClick(event) {
    const { match, article, user, likeArticle, unlikeArticle, getArticle, like } = this.props;
    const { params } = match;
    if (!like) {
      likeArticle(params.slug, user.token);
    } else {
      unlikeArticle(params.slug, user.token);
    }
    // getArticle(params.slug);
  }


  /**
 * render function
 * @returns {Function} jsx
 */
  render() {
    const { likeAttributes } = this.state;
    const { article, user, likesCount, like, getArticle, storeLikes, status } = this.props;
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
        />
      </div>
    );
  }
}
export const mapStateToProps = (state) => {
  const { article} = state.article;
  const { user } = state.auth;
  const { likes, like, likesCount } = state.like;
  return {
    article,
    user,
    likes,
    like,
    likesCount,
  };
};
export default connect(mapStateToProps, {
  getArticle: articleAction.getArticle,
  storeLikes: likeAction.storeLikes,
  setLike: likeAction.setLike,
  likeArticle: likeAction.likeArticle,
  unlikeArticle: likeAction.unlikeArticle,
})(Article);
