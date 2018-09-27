
/* eslint max-len: off */
import { shallow, mount } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Dropdown } from 'semantic-ui-react';
import jest from 'jest';
import TagView from '../../src/components/TagView';

describe('TagView Component', () => {
 it('should match snapshot', ()=>{
  expect(shallow(<TagView />)).toMatchSnapshot();
 })
});
