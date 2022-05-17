import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import TopHeader from './top-header';

configure({ adapter: new Adapter() });

it('TopHeader to mach snapshot', () => {
    const wrapper = shallow(<TopHeader />);
    expect(wrapper).toBeTruthy();
});