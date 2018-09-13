import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * a reusable form input component with custom style
 * @param {Object} props contains:
 * {
 * handleChange(func): handle input change
 * value(string): input value
 * type(string): input type
 * iconName(string): name of materialize icon
 * name(string): name of form input field
 * placeholder(string)
 * children(node): jsx
 * @returns {Function} jsx
 * }
 */
const FormInputWithIcon = (props) => {
  const {
    handleChange, value, type, iconName, name,
    children, placeholder, visibilityIcon, visibilityIconClick } = props;
  return (
    <label htmlFor={name}>
      <div onClick={visibilityIconClick} className="form-field">
        <span className="form-icon-wrapper">
          <i className="material-icons form">{iconName}</i>
        </span>
        <input
          onChange={handleChange}
          value={value}
          type={type}
          name={name}
          placeholder={placeholder}
        />
        {visibilityIcon
          && (
            <span className="form-icon-wrapper right">
              <i
                className="material-icons form"
              >
                {visibilityIcon}
              </i>
            </span>
          )
        }
      </div>
      {children}
    </label>
  );
};

FormInputWithIcon.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  children: PropTypes.node,
  visibilityIcon: PropTypes.string,
  visibilityIconClick: PropTypes.func,
};

FormInputWithIcon.defaultProps = {
  children: null,
  visibilityIcon: '',
  visibilityIconClick: () => {}
};

export default FormInputWithIcon;
