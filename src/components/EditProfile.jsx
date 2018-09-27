import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Image } from 'semantic-ui-react';

/**
 * this function contain the edit profile form
 * @param {Object } formData contain profile detail
 * @param { function } handleSubmitForm
 * @param { function } handleChange
 * @param { function } mouseOutHandler
 * @param { bool } isLoading
 * @returns { object } return the EditProfle component
 */
const EditProfile = ({
  formData,
  handleSubmitForm,
  handleChange,
  mouseOutHandler,
  imageLoading,
  handleImageUpload,
  isLoading }) => {
  const {
    firstName,
    lastName,
    email,
    bio,
    username,
    image
  } = formData;
  let imageEle =
    <Image id="profile-image" src={image} alt={username} circular />;
  if (!image) {
    imageEle = (
      <i className="material-icons" id="alternate-profile-image">
        account_circle
      </i>
    );
  }

  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <Container>
      <div className="content">
        <Form loading={isLoading || imageLoading}>
          <div id="edit-profile-header">
            <h2>Edit your Profile</h2>
          </div>
          <div id="profile-image-div">
            {imageEle}
          </div>
          <div className="form-group">
            <label htmlFor="firstname">
              Firstname
            </label>
            <br />
            <input
              type="text"
              id="firstname"
              className="form-field field-length-ok"
              onChange={handleChange}
              onMouseOut={mouseOutHandler}
              onBlur={mouseOutHandler}
              name="firstName"
              value={firstName}
            />
            <span className="status-box" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">
              Lastname
            </label>
            <br />
            <input
              type="text"
              id="lastname"
              className="form-field field-length-ok"
              onChange={handleChange}
              onMouseOut={mouseOutHandler}
              onBlur={mouseOutHandler}
              name="lastName"
              value={lastName}
            />
            <span className="status-box" />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              className="form-field field-length-ok valid-email"
              onChange={handleChange}
              onMouseOut={mouseOutHandler}
              onBlur={mouseOutHandler}
              name="email"
              disabled="disabled"
              value={email}
            />
            <span className="status-box" />
          </div>
          <div className="form-group">
            <label htmlFor="photo">
              Photo
            </label>
            <br />
            <input
              id="photo"
              type="file"
              className="form-field"
              onChange={handleImageUpload}
              name="image"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">
              Biography
            </label>
            <br />
            <textarea
              id="bio"
              onChange={handleChange}
              onMouseOut={mouseOutHandler}
              onBlur={mouseOutHandler}
              className="form-field field-length-ok"
              name="bio"
              defaultValue={bio}
            />
            <span className="status-box" />
          </div>
          <div>
            <Button
              id="edit-profile-button"
              size="medium"
              fluid
              onClick={handleSubmitForm}
            >
              Update
            </Button>
          </div>
        </Form>
        <div id="edit-profile-footer">
          <Link id="profile-redirect-link" to={`/@${username}`}>Back</Link>
        </div>
      </div>
    </Container>
  );
};

EditProfile.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  mouseOutHandler: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  imageLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default EditProfile;
