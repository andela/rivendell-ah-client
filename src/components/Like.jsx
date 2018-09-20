import React from 'react';
import { Popup, Item, Divider } from 'semantic-ui-react';
import PopComponent from './PopComponent';

const Like = (props) => {
  const { likeAttributes, likesCount, 
    handleClick, handleCountClick, likes, renderLikeBy, onLoadMore } = props;
  const { divClass, buttonClass, iconClass, linkClass } = likeAttributes;
  const likedByList = renderLikeBy();
  // const likedByList = likes
  //   ? (
  //     <div>
  //       <Item.Group>
  //         {
  //           likes.map((likedBy, index) => (
  //             <Item key={index}>
  //               <Item.Image
  //                 size="tiny"
  //                 src={likedBy.user.image
  //                   ? likedBy.user.image
  //                   : 'https://react.semantic-ui.'
  //                   + 'com/images/wireframe/image.png'}
  //               />

  //               <Item.Content>
  //                 <Item.Header as="a">
  //                   {`${likedBy.user.firstName} ${likedBy.user.lastName}`}
  //                 </Item.Header>
  //                 <Item.Meta>Bio</Item.Meta>
  //                 <Item.Description>
  //                   {likedBy.user.bio ? likedBy.user.bio : 'No Bio Info'}

  //                 </Item.Description>
  //                 <Item.Extra>
  //                   {`Liked: ${likedBy.timeLiked.substring(0, 10)}`}
  //                 </Item.Extra>
  //               </Item.Content>
  //             </Item>
  //           ))}
  //       </Item.Group>
  //     </div>
  //   ) : [];
  const trigger = (
    <a className={linkClass} onClick={handleCountClick}>
      {likesCount}
    </a>
  );

  return (
    <div className={divClass}>
      <div className={buttonClass} onClick={handleClick}>
        <i className={iconClass} />
        Likes
      </div>
      <PopComponent
        trigger={trigger}
        content={likedByList}
      />
    </div>
  );
};

export default Like;
