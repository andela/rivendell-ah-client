import { shallow } from 'enzyme';
import React from 'react';
import PopupComponent from '../../src/components/PopComponent';

const linkClass = 'ui basic left pointing label';
const handleCountClick = () => {};
const likesCount = 0;
const likedByList = 'some content';

const trigger = (
    <a className={linkClass} onClick={handleCountClick}>
      {likesCount}
    </a>
  );
const shallowRender = () => (
    shallow(<PopupComponent
        trigger={trigger}
        content={likedByList}
    />)
  )
describe('Testing the PopupComponent', () => {
    it('Should render all elements properly', () => {
        const wrapper = shallowRender();
    });
});

  