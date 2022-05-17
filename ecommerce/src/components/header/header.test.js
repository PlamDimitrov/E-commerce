import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Header from './header';

configure({ adapter: new Adapter() });

it('Header to mach snapshot', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toBeTruthy();
});