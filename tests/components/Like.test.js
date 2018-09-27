import { shallow } from 'enzyme';
import React from 'react';
import Like from '../../src/components/Like';
import mockData from '../config/mockData'

const { likeAttributes } = mockData;
const likesCount = 0;
const handleClick = () => {};
const handleCountClick =() => {};
const likes = [];
const renderLikeBy = () => {};
const onLoadMore = () => {};

const shallowRender = () => (
    shallow(<Like
        likeAttributes={likeAttributes}
        likesCount={likesCount}
        handleClick={handleClick}
        handleCountClick={handleCountClick}
        likes={likes}
        renderLikeBy={renderLikeBy}
        onLoadMore={onLoadMore}
    />)
  )



describe('Testing the Like Component', () => {
    it('Should render all elements properly', () => {
        const wrapper = shallowRender();
    });
});