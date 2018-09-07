import React from 'react';
import TagInput from '../../components/TagInput';

const options = [
  { key: 'tagId1', text: 'age', value: 'age' },
  { key: 'tagId2', text: 'name', value: 'name' }
];

const NewArticle = () => (
  <div>
    <h2>Creating a new article</h2>
    <TagInput options={options} />
  </div>
);
export default NewArticle;
