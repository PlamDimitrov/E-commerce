import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Category from './category';

configure({ adapter: new Adapter() });

it('Category to mach snapshot', () => {
    const wrapper = shallow(<Category />);
    expect(wrapper).toBeTruthy();
});