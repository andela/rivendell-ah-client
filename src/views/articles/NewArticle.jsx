import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import EditArticleControls from '../../components/EditArticleControls';
import createArticleAction from '../../actions/createArticle';

/**
 * This component manages the state of the input elements
 * to the edit Articles
 * @class NewArticle
 * @returns {object} instance of an object
 */
export class NewArticle extends Component {
  /**
   * creates an instance of a NewArticle and binds the
   * methods to the this
   * @param {object} props contains the props sent from thd parent
   */
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   *
   * This function is called when the the user
   * tries to submit the article
   * @returns {void} performs an action and returns nothing
   * @param {object} article contains information about the
   * article
   */
  handleSubmit(article) {
    const { persistArticle } = this.props;
    persistArticle(article);
  }

  /**
   * this renders html
   * @returns {void} renders html an returns nothing
   */
  render() {
    const { storeState } = this.props;
    return (
      <Container>
        <EditArticleControls
          onSubmit={this.handleSubmit}
          {...storeState}
        />
      </Container>);
  }
}

NewArticle.propTypes = {
  persistArticle: propTypes.func,
  storeState: propTypes.shape({
    editing: propTypes.bool,
    isLoading: propTypes.bool,
    success: propTypes.bool,
    article: propTypes.shape,
    errors: propTypes.shape({
      description: propTypes.arrayOf(propTypes.string),
      title: propTypes.arrayOf(propTypes.string),
    }),
  })
};

NewArticle.defaultProps = {
  persistArticle: () => {},
  storeState: {}
};


export const mapStateToProps = state => ({
  storeState: state.createArticleReducer,
});

export const mapDispatchToProps = dispatch => ({
  persistArticle: article => dispatch(createArticleAction(article)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewArticle);
