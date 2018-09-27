import React, { Component } from 'react';
import validator from 'validator';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile, updateRedirect } from '../../actions/profile';
import EditProfile from '../../components/EditProfile.jsx';
import mouseOutHandler from '../../helpers/profileHelper';
import uploadImage from '../../actions/uploadImageAction';

/**
 * Edit profile page
 * @returns {string} rendered html page
 */
export class EditProfilePage extends Component {
  /**
   * constructor function
   * @returns {object} the state propertiest
   */
  constructor() {
    super();
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mouseOutHandler = mouseOutHandler.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.imageFileReader = new FileReader();
    this.state = {};
  }

  /**
   * sets state property when the page load
   * @returns {null} no value is returned
   */
  componentDidMount() {
    this.imageFileReader.addEventListener('load', () => {
      this.props.uploadImage(this.imageFileReader.result);
    });
  }

  /**
   * update the state with user profile
   * @returns {object} set formData to state
   */
  componentWillMount() {
    this.setState({
      formData: this.props.userProfile,
    });
  }

  /**
   * set state variable when the compoent update
   * @param {*} nextProps of the component state
   * @returns {null} set imageUrl to state
   */
  componentWillReceiveProps(nextProps) {
    const { imageUrl, imageLoading, success } = nextProps;
    this.setState({
      imageLoading,
    });
    if (success) {
      this.state.formData.image = imageUrl;
    }
  }
  /**
   * @param { object } event element recieving an
   * event
   * @returns { object } the event object
   */
  handleUpdateProfile(event) {
    event.preventDefault();
    this.props.updateProfile('/user', this.state.formData);
    return event;
  }

  /**
   * update state on changes event
   * @param { object } event
   * @returns { object } event
   */
  handleChange(event) {
    event.persist();
    const { name, value, id } = event.target;
    if ((name === 'firstName' || name === 'lastName'
      || name === 'email' || name === 'bio')
      && (value.length === 0 || value.length >= 2)) {
      let eleClass = event.target.className;
      if (eleClass.indexOf('field-length-fail') >= 0) {
        eleClass = eleClass
          .replace('field-length-fail', 'field-length-ok');
        const ele = document.getElementById(id);
        ele.setAttribute('class', eleClass);
        const spanEle = event.target.nextSibling;
        spanEle.innerHTML = '';
      }
    }
    if (name === 'email' && (validator.isEmail(value))) {
      let eleClass = event.target.className;
      if (eleClass.indexOf('invalid-email') >= 0) {
        eleClass = eleClass.replace('invalid-email', 'valid-email');
        const ele = document.getElementById(id);
        ele.setAttribute('class', eleClass);
        const spanEle = event.target.nextSibling;
        spanEle.innerHTML = '';
      }
    }
    this.setState(state => (
      {
        formData: {
          ...state.formData, [name]: value,
        }
      }
    ));
    return event;
  }

  /**
   * this function handle image upload
   * @param {object} event html event object
   * @returns {null} read the image data
   */
  handleImageUpload({ target: { files } }) {
    this.imageFileReader.readAsDataURL(files[0]);
  }

  /**
   * render the EditprofilePage component
   * and pass down properties to the editProfile
   * component
   * @returns { string } the rendered profile EditProfile component
   */
  render() {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    const { isLoading, redirect } = this.props;
    const { imageLoading } = this.state;
    if (redirect) {
      this.props.updateRedirect();
      return <Redirect to={`/@${this.props.userProfile.username}`} />;
    }
    return (
      <div id="edit-profile-page" className="content">
        <EditProfile
          handleSubmitForm={this.handleUpdateProfile}
          handleChange={this.handleChange}
          mouseOutHandler={this.mouseOutHandler}
          formData={this.state.formData}
          handleImageUpload={this.handleImageUpload}
          isLoading={isLoading}
          imageLoading={imageLoading}
        />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
EditProfilePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired,
  updateRedirect: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageLoading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

// export default EditProfile;
export const mapStateToProps = (state) => {
  const { userProfile,
    profile,
    isLoading,
    redirect,
  } = state.profile;
  const {
    imageUrl,
    isLoading: imageLoading,
    success
  } = state.uploadImageReducer;
  return {
    userProfile,
    profile,
    isLoading,
    redirect,
    imageUrl,
    imageLoading,
    success,
  };
};

export default connect(
  mapStateToProps,
  { updateProfile, updateRedirect, uploadImage }
)(EditProfilePage);
