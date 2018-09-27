import React from 'react';
import { PropTypes } from 'prop-types';
import PopupComponent from './PopComponent';

const Like = (props) => {
  const { likeAttributes, likesCount,
    handleClick, renderLikeBy } = props;
  const { divClass, buttonClass,
    iconClass, linkClass } = likeAttributes;
  const likedByList = renderLikeBy();

  const trigger = (
    <a className={linkClass}>
      {likesCount}
    </a>
  );

  return (
    <div className={divClass}>
      <div className={buttonClass} onClick={handleClick}>
        <i className={iconClass} />
        Likes
      </div>
      <PopupComponent
        trigger={trigger}
        content={likedByList}
      />
    </div>
  );
};
Like.propTypes = {
  likeAttributes: PropTypes.shape({
    divClass: PropTypes.string,
    buttonClass: PropTypes.string,
    iconClass: PropTypes.string,
    linkClass: PropTypes.string,
  }).isRequired,
  likesCount: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  renderLikeBy: PropTypes.func.isRequired,
};
Like.defaultProps = {
  likesCount: 0,
};
export default Like;
