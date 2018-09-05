import { shallow } from 'enzyme';
import React from 'react';
import App from '../src/App';

describe('Testing the App Component', () => {
  it('should render without an error', () => {
    shallow(<App />);
  });
});
