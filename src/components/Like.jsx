import React from 'react';

const Like = (props) => {
  const { likeAttributes, likesCount, handleClick } = props;
//   console.log('in likesss', likeAttributes);
  const { divClass, buttonClass, iconClass, linkClass } = likeAttributes;
//   console.log('divclass', divClass);
  return (
    <div className={divClass}>
      <div className={buttonClass} onClick={handleClick}>
        <i className={iconClass} />
                Likes
      </div>
      <a className={linkClass}>
        {likesCount}
      </a>
    </div>
  );
};

export default Like;
