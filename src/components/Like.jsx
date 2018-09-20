import React from 'react';
import { Popup } from 'semantic-ui-react';

const Like = (props) => {
  const { likeAttributes, likesCount, handleClick, handleCountClick } = props;
  //   console.log('in likesss', likeAttributes);
  const { divClass, buttonClass, iconClass, linkClass } = likeAttributes;
  //   console.log('divclass', divClass);
  return (
    <div className={divClass}>
      <div className={buttonClass} onClick={handleClick}>
        <i className={iconClass} />
        Likes
      </div>
      <Popup
        trigger={(
          <a className={linkClass} onClick={handleCountClick}>
            {likesCount}
          </a>
        )}
      >
        <Popup.Header>User who liked</Popup.Header>
        <Popup.Content>
          List of users who liked
        </Popup.Content>
      </Popup>
    </div>
  );
};

export default Like;
