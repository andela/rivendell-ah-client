import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { EditProfilePage, mapStateToProps }from '../../src/views/user/EditProfilePage';
import EditProfile from '../../src/components/EditProfile';
import { updateProfile } from '../../src/actions/profile';
import configureStore from 'redux-mock-store';

const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  profile: {},
};


const profile = {
  bio: null,
  email: "reader11@gmail.com",
  firstName: "myfirstname",
  id: 18,
  image: null,
  lastName: "mylastname",
  username: "reader11",
  verified: true,
};

const appState = {
  ...initialState,
  profile: {
    userProfile: profile,
  }
}
document.getElementById = (id) => ({
  setAttribute: jest.fn(),
})

const mockStore = configureStore();

describe('Edit Profile', () => {
  const handleChange = jest.fn();
  const handleUpdateProfile = jest.fn();
  const mouseOutHandler = jest.fn();
  describe('component', () => {
    it('should render without error', () => {
      const wrapper = shallow(<EditProfile
        formData={profile}
        handleChange={handleChange}
        handleSubmitForm={handleUpdateProfile}
        mouseOutHandler={mouseOutHandler}
        />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('page', () => {
    it('should render without error', () => {
      const store = mockStore(initialState)
      const wrapper = shallow(
      <EditProfilePage
        updateProfile={updateProfile}
        store={store}
        userProfile={profile}
        handleChange={handleChange}
        handleSubmitForm={handleUpdateProfile}
      />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render without error', () => {
      const match = {
        params: {
          username: 'reader11'
        }
      }
      const handleChange = jest.fn();
      const handleUpdateProfile = jest.fn();
      const store = mockStore(initialState)
      const wrapper = mount(
      <EditProfile
        updateProfile={updateProfile}
        store={store}
        userProfile={profile}
        formData={profile}
        handleChange={handleChange}
        handleSubmitForm={handleUpdateProfile}
        isLoading={false}
      />);
      const event = {
        preventDefault: ()=>{},

      }
      jest.spyOn(event, 'preventDefault')
     
      const button = wrapper.find('button');
      expect(button.length).toBe(1);
      button.simulate('click');
      expect(handleUpdateProfile).toHaveBeenCalled();
    });

    it('should render without error', () => {
      const store = mockStore(appState);
      const wrapper = mount(
        <MemoryRouter>
          <EditProfilePage
            updateProfile={updateProfile}
            store={store}
            userProfile={profile}
            handleChange={handleChange}
            handleSubmitForm={handleUpdateProfile}
          />
        </MemoryRouter>
      );
      const divEle = wrapper.find('div');
      const updateButton = wrapper.find('button');
      expect(divEle.find('form').length).toBe(1)
      expect(updateButton.length).toBe(1);
    });
  });

  describe('dom events', () => {
    const store = mockStore(appState);
    const userProfile = {
      bio: 'my bio',
      email: "somebody@gmail.com",
      firstName: "somebody",
      id: 18,
      image: null,
      lastName: "somebody",
      username: "somebody",
      verified: true,
    }
    const history = {
      push: jest.fn(),
    }
    const wrapper = mount(
      <MemoryRouter>
        <EditProfilePage
        updateProfile={updateProfile}
        store={store}
        userProfile={userProfile}
        userRedirect={true}
        history={history}
        />
      </MemoryRouter>
    );
    const editProfilePageWrapper = wrapper.find('EditProfilePage');

    describe('handle update profile', () => {
      const event = {
        preventDefault: ()=>{},
      }
      jest.spyOn(event, 'preventDefault')
      it('should execute handleChange on change', () => {
        const handleUpdate = editProfilePageWrapper.instance().handleUpdateProfile(event);
        expect(handleUpdate.preventDefault).toHaveBeenCalled();
      })
    });

    describe('mouse out handler', () => {
      const event = {
        target: {
          name: 'email',
          value: '',
          className: 'field-length-ok',
          id: 'email',
          nextSibling: {}
        }
      }

      it('should render firstname in input field', () => {
        event.target.value = 'e'
        const handleMouseOut = editProfilePageWrapper.instance().mouseOutHandler(event);
        expect(handleMouseOut.target.name).toBe('email');
        expect(handleMouseOut.target.nextSibling.innerHTML)
        .toEqual('length of email must be greater than 2')
      });

      it('should check changes on email field', () => {
        event.target.value = 'somebody';
        event.target.className = 'valid-email';
        const mouseOutEvent = editProfilePageWrapper.instance().mouseOutHandler(event);
        expect(mouseOutEvent.target.value).toEqual('somebody');
        expect(mouseOutEvent.target.name).toEqual('email');
        expect(mouseOutEvent.target.id).toEqual('email');
        expect(mouseOutEvent.target.nextSibling.innerHTML).toEqual('please enter a valid email');
      })
    });
    describe('handle change', () => {
      const event = {
        target: {
          name: 'email',
          value: '',
          className: 'field-length-ok',
          id: 'email',
          nextSibling: {},
        },
        persist: () => {}
      }
      it('should execute handleChange on change', () => {
        event.target.value = ''
        event.target.nextSibling.innerHTML = '';
        const handleChangeEvent = editProfilePageWrapper.instance().handleChange(event);
        expect(handleChangeEvent.target.value).toEqual('');
        expect(handleChangeEvent.target.className).toEqual('field-length-ok')
        expect(handleChangeEvent.target.id).toEqual('email')
      })

      it('should execute handleChange on change', () => {
        event.target.value = 's';
        event.target.className = 'field-length-fail'
        const handleChangeEvent = editProfilePageWrapper.instance().handleChange(event);
        expect(handleChangeEvent.target.value).toEqual('s');
        expect(handleChangeEvent.target.className).toEqual('field-length-fail')
        expect(handleChangeEvent.target.id).toEqual('email')
      })
      it('should execute handleChange on change', () => {
        event.target.value = '';
        event.target.className = 'field-length-fail'
        const handleChangeEvent = editProfilePageWrapper.instance().handleChange(event);
        expect(handleChangeEvent.target.value).toEqual('');
        expect(handleChangeEvent.target.className).toEqual('field-length-fail')
        expect(handleChangeEvent.target.id).toEqual('email')
      })
      it('should execute if email is valid', () => {
        event.target.value = 'some@body.com';
        event.target.className = 'invalid-email';
        const handleChangeEvent = editProfilePageWrapper.instance().handleChange(event);
        expect(handleChangeEvent.target.value).toEqual('some@body.com');
        expect(handleChangeEvent.target.className).toEqual('invalid-email')
        expect(handleChangeEvent.target.id).toEqual('email')

      })
    });
  })

  describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
      const appState = {
        profile: {
          isLoading: false,
          errors: {},
          profile: {},
          userProfile: {},
        }
      }
      const componentState = mapStateToProps(appState);
      const expectedState = {
        isLoading: false,
        profile: {},
        userProfile: {},
      }
      expect(componentState).toEqual(expectedState);
    });
  });
});
