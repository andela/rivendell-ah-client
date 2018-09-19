import { shallow, mount } from 'enzyme';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Router } from 'react-router-dom';
import {
  Logo, SearchBar, NavProfileImage, DesktopNavDropDown,
  DesktopNav, HamburgerMenu, CloseSideMenuButton, MobileNav
} from '../../src/components/helpers/HeaderHelper';

describe('Testing the Logo component', () => {
  it('Should render as expected', () => {
    const tree = shallow(<Logo />);
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the SearchBar component', () => {
  it('Should render as expected', () => {
    const tree = shallow(<SearchBar />);
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the NavProfileImage component', () => {
  it('Should render a profile image if it is passed', () => {
    const image = 'my-image-url';
    const profileImgClick = () => {};
    const tree = shallow(<NavProfileImage
      image={image} profileImgClick={profileImgClick}
    />);
    expect(tree.equals(<img
      alt="avatar"
      className="img"
      src={image}
      onClick={profileImgClick}
    />))
  });
  it('Should render a profile image icon if profile image is not passed', () => {
    const image = '';
    const profileImgClick = () => {};
    const profileImage = NavProfileImage({ image, profileImgClick });
    const tree = shallow(profileImage);
    expect(tree.equals(<i
      className="material-icons profile-img"
      onClick={profileImgClick}
    >
    account_circle
    </i>))
  });
});

describe('Testing the DesktopNavDropDown component', () => {
  const firstName = 'firstName';
  const logout = () => {};
  const username = 'username';
  let showDropDown = true;
  it('Should render if showDropDown is true', () => {
    const tree = shallow(<DesktopNavDropDown
      firstName={firstName}
      logout={logout}
      username={username}
      showDropDown={showDropDown}
    />)
    expect(tree).toBeDefined;
  });
  it('Should not render if showDropDown is true', () => {
    showDropDown = false
    const tree = shallow(<DesktopNavDropDown
      firstName={firstName}
      logout={logout}
      username={username}
      showDropDown={showDropDown}
    />)
    expect(tree).toBeNull;
  });
});

describe('Testing the DesktopNav component', () => {
  const firstName = 'firstName';
  const logout = () => {};
  const username = 'username';
  let token = '';
  const showDropDown = false;
  const image = 'my-image-url';
  const profileImgClick = () => {};
  const history = {
    location: {
      pathname: '/'
    },
    listen: () => {},
    createHref: () => {},
    push: () => {},
    replace: () => {}
  };  it('Should render a login button when no token is present', () => {
    const tree = mount(<Router history={history}><DesktopNav
      firstName={firstName}
      logout={logout}
      username={username}
      token={token}
      image={image}
      profileImgClick={profileImgClick}
      showDropDown={showDropDown}
    /></Router>);
    expect(tree.contains('Login')).toEqual(true);
  });
  it('Should render the notification icon when token is present', () => {
    token = 'token';
    const tree = mount(<Router history={history}><DesktopNav
      firstName={firstName}
      logout={logout}
      username={username}
      token={token}
      image={image}
      profileImgClick={profileImgClick}
      showDropDown={showDropDown}
    /></Router>);
    expect(tree.contains(<i className="material-icons">notifications_none</i>)).toEqual(true);
  });
});

describe('Testing the HamburgerMenu component', () => {
  it('Should render as expected', () => {
    const slideIn = () => {}
    const tree = shallow(<HamburgerMenu slideIn={slideIn} />)
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the CloseSideMenuButton component', () => {
  it('Should render as expected', () => {
    const slideOut = () => {}
    const tree = shallow(<CloseSideMenuButton slideOut={slideOut} />)
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing the MobileNav component', () => {
  const firstName = 'firstName';
  const logout = () => {};
  const username = 'username';
  let token = '';
  const sideMenuStyles = {
    animationName: ''
  };
  const image = 'my-image-url';
  const profileImgClick = () => {};
  const slideOut = () => {}
  const history = {
    location: {
      pathname: '/'
    },
    listen: () => {},
    createHref: () => {},
    push: () => {},
    replace: () => {}
  };
  it('Should render a login button when no token is present', () => {
    const tree = mount(<Router history={history}><MobileNav
      firstName={firstName}
      logout={logout}
      username={username}
      token={token}
      image={image}
      profileImgClick={profileImgClick}
      slideOut={slideOut}
      sideMenuStyles={sideMenuStyles}
    /></Router>);
    expect(tree.contains(
      <li>
        <Icon name="sign-in" />
        Login
      </li>
    )).toEqual(true);
  });
  it('Should render the first name when token is present', () => {
    token = 'token';
    const tree = mount(<Router history={history}><MobileNav
      firstName={firstName}
      logout={logout}
      username={username}
      token={token}
      image={image}
      profileImgClick={profileImgClick}
      slideOut={slideOut}
      sideMenuStyles={sideMenuStyles}
    /></Router>);
    expect(tree.contains(<span className="first-name">{firstName}</span>)).toEqual(true);
  });
});
