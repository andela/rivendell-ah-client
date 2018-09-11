import { shallow } from 'enzyme';
import React from 'react';
import { mapStateToProps } from '../../src/views/auth/Login';
import { Login } from '../../src/views/auth/Login';
import mockData from '../config/mockData';

const {searchParams} = mockData;
const location = { search: searchParams };
const history = {
            replace: (string) => {
                return null;
            }
        }
const shallowRender = () => (
    shallow(<Login
        history={history}
        socialLoginRedirect={() => {}}
        socialLogin={() => {}}
        location={location}
        />)
)

describe('Testing the Login Component', () => {
    describe('Testing mapStateToProps', () => {
        it('should map the state to the props correctly', () => {
            const state = {
                auth: {
                    token: '',
                },
                redirect: {
                    redirectUrl: '/'
                }
            };
            const componentState = mapStateToProps(state);
            expect(componentState).toEqual({ redirectUrl: state.redirect.redirectUrl, token: state.auth.token});
        });
    })

    describe('Testing componentDidMount', () => {
        jest.spyOn(Login.prototype,'componentDidMount')
        shallowRender();
        expect(Login.prototype.componentDidMount.mock.calls.length).toBe(1)
    })
    describe('Testing componentWillUnmount', () => {
        jest.spyOn(Login.prototype,'componentWillUnmount')
        const wrapper = shallowRender();
        expect(Login.prototype.componentWillUnmount.mock.calls.length).toBe(0)
        wrapper.unmount(<Login history={history} socialLoginRedirect={() => {}} socialLogin={() => {}} location={location} />)
        expect(Login.prototype.componentWillUnmount.mock.calls.length).toBe(1)
    })
    it('Should render all elements properly', () => { 
        shallowRender();
    });
})