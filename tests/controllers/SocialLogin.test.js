import { shallow } from 'enzyme';
import React from 'react';
import mockData from '../config/mockData';
import SocialLogin from '../../src/components/SocialLogin';

const {socialMediaPlatforms} = mockData;

describe('Testing the Social Login Component', () => {
    it('Should render all elements properly on development environment', () => {
        process.env.NODE_ENV = 'development';
        const wrapper = shallow(<SocialLogin socialMedia={socialMediaPlatforms}/>);
        expect(wrapper.find('div').length).toBe(3)
        expect(wrapper.find('div').children().length).toBe(3)
        expect(wrapper.find('a').length).toBe(3)
        expect(wrapper.find('a').children().length).toBe(6)
        expect(wrapper.find('span').length).toBe(6)
        expect(wrapper.find('span').children().length).toBe(6)
        expect(wrapper.find('i').length).toBe(3) 
        expect(wrapper.find('i').children().length).toBe(0)   
    });
});
describe('Testing the Social Login Component', () => {
    it('Should render all elements properly on test environment', () => {
        process.env.NODE_ENV = 'test';
        const wrapper = shallow(<SocialLogin socialMedia={socialMediaPlatforms}/>);
        expect(wrapper.find('div').length).toBe(3)
        expect(wrapper.find('div').children().length).toBe(3)
        expect(wrapper.find('a').length).toBe(3)
        expect(wrapper.find('a').children().length).toBe(6)
        expect(wrapper.find('span').length).toBe(6)
        expect(wrapper.find('span').children().length).toBe(6)
        expect(wrapper.find('i').length).toBe(3) 
        expect(wrapper.find('i').children().length).toBe(0)   
    });
});
