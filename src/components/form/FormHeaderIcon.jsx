import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * component for displaying a styled header icon
 * @param {Object} param0 contains icon name
 * @returns {Function} jsx
 */
const FormHeaderIcon = ({ iconName }) => {
  if (!iconName) return null;
  return (
    <div className="icon-border">
      <i className="material-icons top">{iconName}</i>
    </div>
  );
};

FormHeaderIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
};


export default FormHeaderIcon;
