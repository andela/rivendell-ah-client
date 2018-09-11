import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ProfilePage, mapStateToProps } from '../../src/views/user/ProfilePage.jsx';
import Profile from '../../src/components/Profile.jsx';
import configureStore from 'redux-mock-store';


const profile = {
  bio: null,
  email: "reader11@gmail.com",
  firstName: "myfirs",
  id: 18,
  image: null,
  lastName: "mylas",
  username: "reader11",
  verified: true,
};

const owner = 'reader11';
const history = {
  push: jest.fn(),
  location: '/',
  listen: jest.fn(),
};
const getProfile = jest.fn()

const appState = {
  auth: {
    user: {},
    token: 'tokenvariable'
  },
  profile: {
    isLoading: false,
    errors: {},
    profile: {},
    userProfile: {},
  }
}

describe('Profile', () => {
  describe('component', () => {
    it('should render', () => {
      const match = {
        params: {
          username: 'reader11'
        }
      }
      const wrapper = shallow(
      <Profile
        userProfile={profile}
        profile={profile}
        match={match}
        owner={owner}
      />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with an alternate materialize icon if no image is present', () => {
      const match = {
        params: {
          username: 'reader11'
        }
      }
      const wrapper = mount(
        <MemoryRouter>
            <Profile
              profile={profile}
              owner={owner}
              match={match}
            />
        </MemoryRouter>
      )
      const div = wrapper.find('div');
      const materialIconAlt = div.find('[id="alternate-profile-image"]');
      expect(materialIconAlt.length).toBe(1);
    });
  });

  describe('Page', () => {
    it('should render', () => {
      const match = {
        params: {
          username: 'reader11'
        }
      }
      const wrapper = shallow(
      <ProfilePage
        owner={owner}
        match={match}
        getProfile={getProfile}
        userProfile={profile}
        profile={profile}
      />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render with an update link', () => {
      const match = {
        params: {
          username: 'reader11'
        }
      }
      const wrapper = mount(
        <MemoryRouter>
          <ProfilePage
            owner={owner}
            match={match}
            getProfile={getProfile}
            userProfile={profile}
          />
        </MemoryRouter>
      );
      const updateLink = wrapper.find('Link [id="update-profile-link"]');
      expect(updateLink.length).toBe(1);
      expect(updateLink.text()).toEqual('Edit your Profile');
    });

    it('should render without an update profile link', () => {
      const match = {
        params: {
          username: 'reader1'
        }
      }
      const wrapper = mount(
        <MemoryRouter>
          <ProfilePage
            owner={owner}
            match={match}
            getProfile={getProfile}
            userProfile={profile}
            profile={profile}
          />
        </MemoryRouter>
      );
      const updateLink = wrapper.find('Link [id="update-profile-link"]');
      expect(updateLink.length).toBe(1);
    });
    it('should render with an alternate profile image', () => {

      const wrapper = mount(
        <MemoryRouter>
          <Profile profile={profile} owner={profile.username} errors={{}}/>
        </MemoryRouter>
      );
      const altProfileImage = wrapper.find('#alternate-profile-image');
      expect(altProfileImage.text())
      .toBe('account_circle');
    });

    it('should render with a custom error message if user is not found', () => {
      const errors = {
        message: 'User not found',
      }
      const profile = {};
      const owner = 'somebody'
      const wrapper = mount(
        <MemoryRouter>
          <Profile profile={profile} owner={owner} errors={errors}/>
        </MemoryRouter>
      );
      const errorMessage = wrapper.find('#profile-error-message');
      expect(errorMessage.text())
      .toBe('The user you are looking for does not exist');
    });

    it('should render with a custom error message if there is network error', () => {
      const errors = {
        message: 'Network Error',
      }
      const profile = {};
      const owner = 'somebody'
      const wrapper = mount(
        <MemoryRouter>
          <Profile profile={profile} owner={owner} errors={errors}/>
        </MemoryRouter>
      );
      const errorMessage = wrapper.find('#profile-error-message');
      expect(errorMessage.text())
      .toBe('The server is down at the moment. Please try again later.');
    });
  });

  describe('mapStateToProps', () => {
    it('should map the state to props correctly', () => {
      const componentState = mapStateToProps(appState);
      const expectedState = {
        errors: {},
        userProfile: {},
        isLoading: false,
        profile: {},
      }
      expect(componentState).toEqual(expectedState);
    })
  })
});
