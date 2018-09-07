
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Button, Dropdown } from 'semantic-ui-react';
import EditArticleControls from '../../src/components/EditArticleControls';

describe('Testing EditArticleControls', () => {
  let mountedObj;


  describe('basic elements rendered in the component', () => {
    it('should contain a semantic-ui-react Button.Group Component', () => {
      mountedObj = shallow(<EditArticleControls />);
      chai.expect(mountedObj.find(Button.Group).length).to.be.greaterThan(0);
    });

    it('should contain a semantic-ui-react Dropdowm', () => {
      mountedObj = shallow(<EditArticleControls />);
      chai.expect(mountedObj.find(Dropdown).length).to.be.greaterThan(0);
    });
  });


  describe('the controls contained in the component', () => {

  });

  // describe('when the button props is added to it', () => {
  //   // const buttonsArr = [
  //   //   {
  //   //     primary: true,
  //   //     content: 'First Button',
  //   //     positive: true
  //   //   },
  //   //   {
  //   //     secondary: true,
  //   //     content: 'Second Button'
  //   //   },
  //   // ];
  //   // it('should render button content based on props from array', () => {
  //   //   mountedObj = shallow(<EditArticleControls buttons={buttonsArr} />);
  //   //   const allValid = buttonsArr.every(button => mountedObj.find(
  //   //     `Button[content="${button.content}"]`
  //   //   ).length > 0);

  //   //   chai.expect(allValid).to.equal(true);
  //   // });

  //   // it('should render button types based on props from array', () => {
  //   //   mountedObj = shallow(<EditArticleControls buttons={buttonsArr} />);
  //   //   const allValid = buttonsArr.every(button => mountedObj.find(
  //   //     `${button.primary ? '[primary=true]' : ''}${button.secondary ? '[secondary=true]' : ''}`
  //   //   ).length > 0);

  //   //   chai.expect(allValid).to.equal(true);
  //   // });
  // });
});
