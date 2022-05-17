import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import SidebarLeft from './sidebar-left';

configure({ adapter: new Adapter() });

it('SidebarLeft to mach snapshot', () => {
    const wrapper = shallow(<SidebarLeft />);
    expect(wrapper).toBeTruthy();
});