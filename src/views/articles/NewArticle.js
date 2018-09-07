import React from 'react';
import BasicUserInfo from '../../components/BasicUserInfo';
import EditArticleControls from '../../components/EditArticleControls';


const NewArticle = () => (
  <div>
    <h2>Creating a new article</h2>
    <BasicUserInfo
      username="tempUser"
      image="https://i.ytimg.com/vi/3YJpUROvQAk/maxresdefault.jpg"
    />
    <EditArticleControls />
  </div>
);
export default NewArticle;
