import React from 'react';
import { Header, Modal } from 'semantic-ui-react';

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
      <Modal trigger={(
        <a className={linkClass} onClick={handleCountClick}>
          {likesCount}
        </a>
      )}
      >
        <Modal.Header>Users who liked</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header> Users </Header>
            <p>showing the users</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>

    </div>
  );
};

export default Like;
