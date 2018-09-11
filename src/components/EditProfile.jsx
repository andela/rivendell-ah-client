import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container } from 'semantic-ui-react';

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
  isLoading }) => {
  const {
    firstName,
    lastName,
    email,
    bio,
    username,
    image
  } = formData;
  let imageEle = <img id="profile-image" src={image} alt={username} />;
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
        <Form loading={isLoading}>
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
            <input
              type="email"
              id="email"
              className="form-field field-length-ok valid-email"
              onChange={handleChange}
              onMouseOut={mouseOutHandler}
              onBlur={mouseOutHandler}
              name="email"
              value={email}
            />
            <span className="status-box" />
          </div>
          <div className="form-group">
            <label htmlFor="photo">
              Photo
            </label>
            <input
              id="photo"
              type="file"
              className="form-field"
              onChange={handleChange}
              name="image"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">
              Biography
            </label>
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
      </div>
    </Container>
  );
};

EditProfile.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  mouseOutHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default EditProfile;
