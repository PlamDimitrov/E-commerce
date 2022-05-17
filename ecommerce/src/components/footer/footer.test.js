import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Footer from './footer';

configure({ adapter: new Adapter() });

it('Footer to mach snapshot', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toBeTruthy();
});