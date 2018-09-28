import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Rating, Item, Statistic, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { articleRatingsAction, rateArtcleAction }
  from '../../../actions/ratingActions';
import RatersList from './RatersList';
import { PopupRaters } from './PopupRaters';
import RatingStats from './RatingStats';
import '../../../../public/styles/rate-articles.scss';

/**
 *
 * The ArticleRating component article ratings
 * and handle events related to article ratings
 * @class Rating
 * @returns {undefined} this is a class thus does not return anything
 */
export class ArticleRating extends Component {
  /**
   * @returns {null} null
  export default Header;
  */
  constructor() {
    super();
    this.state = {
      start: 0,
      end: 2,
      range: 2,
      showPreviousIcon: false,
      disableShowMore: false,
    };

    this.ratings = {
      hasFetched: true,
    };

    this.handleArticleRating = this.handleArticleRating.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleShowPrevious = this.handleShowPrevious.bind(this);
  }


  /**
   * componentDidMount
   * @returns {undefined} returns nothing
   */
  componentDidMount() {
    const { dispatch, user, articleSlug } = this.props;
    localStorage.setItem('userId', user.id);
    dispatch(articleRatingsAction(articleSlug));
    this.ratings.hasFetched = true;
  }

  /**
   * componentDidUpdate
   * @returns {undefined} returns nothing
   */
  componentDidUpdate() {
    const { dispatch, isRated, articleSlug } = this.props;
    const { hasFetched } = this.ratings;
    if (isRated && !hasFetched) {
      dispatch(articleRatingsAction(articleSlug));
      this.ratings.hasFetched = true;
    }
  }

  /**
   * handle rating of an article
   * @param {Object} event event object
   * @param {Object} rating rating object
   * @returns {undefined} returns nothing
   */
  handleArticleRating(event, { rating }) {
    event.preventDefault();
    const { dispatch, myRating, history, articleSlug } = this.props;
    if (!localStorage.getItem('token')) {
      history.push('/login');
      return;
    }
    const isFirstRating = myRating === 0;
    dispatch(rateArtcleAction(articleSlug, rating, isFirstRating));
    this.ratings.hasFetched = false;
  }

  /**
   * @param {Object} event event object
   * @returns {undefined} returns nothing
   */
  handleShowMore(event) {
    event.preventDefault();
    const { raters } = this.props;
    let { start, end,
      showPreviousIcon, disableShowMore
    } = this.state;
    const { range } = this.state;
    end += 1;
    if (end - start > range) start += 1;
    if (end >= raters) {
      end = raters;
      disableShowMore = true;
    }
    if (start > 0) {
      showPreviousIcon = true;
    }
    this.setState({ start, end, showPreviousIcon, disableShowMore });
  }

  /**
   * sh
   * @param {Object} event event object
   * @returns {undefined} returns nothing
   */
  handleShowPrevious(event) {
    event.preventDefault();
    const { raters } = this.props;
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
    if (end < raters) disableShowMore = false;
    this.setState({ start, end, showPreviousIcon, disableShowMore });
  }

  /**
   * Renders the component
   * @returns {string} - HTML Markup for the component
   */
  render() {
    const { averageRating, myRating, raters, ratersInfo, user } = this.props;
    const { start, end } = this.state;
    let loginUserView = <Item />;
    const ratersList = ratersInfo ? ratersInfo.map((rater, index) => {
      const { username, firstName, lastName,
        firstRated, lastRated, image, rating } = rater;
      const firstRatedDate = firstRated.split('T');
      const lastRatedDate = lastRated.split('T');
      const raterView = (
        <Item key={index}>
          <Link to={`/@${username}`}>
            {image
              ? (
                <Item.Image
                  className="popupImage"
                  size="tiny"
                  src={image}
                />
              )
              : <Icon name="user" size="massive" />}
          </Link>
          <Item.Content>
            <Item.Header>
              <Link to={`/@${username}`}>
                {`${firstName} ${lastName}`}
              </Link>
            </Item.Header>
            <Item.Meta>
              Rating:
              <Rating
                icon="star"
                rating={rating}
                maxRating={5}
              />
              (
              {rating}
              )
            </Item.Meta>
            <Item.Extra>
              {`Last Rated: ${lastRatedDate[0]}
              ${lastRatedDate[1].split('.')[0]}`}
              <br />
              {`First Rated: ${firstRatedDate[0]} 
              ${firstRatedDate[1].split('.')[0]}`}
            </Item.Extra>
          </Item.Content>
        </Item>
      );
      if (user.username === rater.username) loginUserView = raterView;
      return raterView;
    }) : [];

    const ratersTrigger = (
      <Statistic.Value>
        {raters}
      </Statistic.Value>
    );
    const loginRaterTrigger = (
      <Statistic.Value>
        {myRating}
      </Statistic.Value>);
    const { showPreviousIcon, disableShowMore } = this.state;
    const content = (
      <RatersList
        handleShowMore={this.handleShowMore}
        handleShowPrevious={this.handleShowPrevious}
        disableShowMore={disableShowMore}
        showPreviousIcon={showPreviousIcon}
        content={ratersList.slice(start, end)}
      />
    );
    const ratersPopup = (
      <PopupRaters
        trigger={ratersTrigger}
        content={content}
      />
    );
    const myRatingPopup = (
      <PopupRaters
        trigger={loginRaterTrigger}
        content={loginUserView}
      />);

    return (
      <div className="rateArticles">
        <div>
          <div>

            <Rating
              icon="star"
              rating={myRating}
              maxRating={5}
              onRate={this.handleArticleRating}
              size="large"
            />
            <RatingStats
              myRatingPopup={myRatingPopup}
              average={averageRating}
              ratersPopup={ratersPopup}
            />
          </div>
        </div>

      </div>
    );
  }
}

ArticleRating.propTypes = {
  dispatch: PropTypes.func.isRequired,
  myRating: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
  raters: PropTypes.number.isRequired,
  isRated: PropTypes.bool.isRequired,
  articleSlug: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  ratersInfo: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })).isRequired,
};

export const mapStateToProps = ({
  rateArticle,
  articleRatings: { success: { rating } },
  profile: { userProfile: user },
}) => ({ ...rating, ...rateArticle, user });

const ArticleRatingWithRouter = withRouter(ArticleRating);

export default connect(mapStateToProps)(ArticleRatingWithRouter);
