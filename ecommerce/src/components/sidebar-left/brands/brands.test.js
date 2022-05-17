import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Brands from './brands';

configure({ adapter: new Adapter() });

it('Brands to mach snapshot', () => {
    const wrapper = shallow(<Brands />);
    expect(wrapper).toBeTruthy();
});