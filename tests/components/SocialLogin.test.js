import { shallow } from 'enzyme';
import React from 'react';
import mockData from '../config/mockData';
import SocialLogin from '../../src/components/SocialLogin';

const {socialMediaPlatforms} = mockData;

describe('Testing the Social Login Component', () => {
    it('Should render all elements properly on development environment', () => {
        process.env.NODE_ENV = 'development';
        const wrapper = shallow(<SocialLogin socialMedia={socialMediaPlatforms}/>);
    });
});
describe('Testing the Social Login Component', () => {
    it('Should render all elements properly on test environment', () => {
        process.env.NODE_ENV = 'test';
        const wrapper = shallow(<SocialLogin socialMedia={socialMediaPlatforms}/>); 
    });
});
