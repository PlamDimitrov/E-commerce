import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import MiddleHeader from './middle-header';

configure({ adapter: new Adapter() });

it('MiddleHeader to mach snapshot', () => {
    const wrapper = shallow(<MiddleHeader />);
    expect(wrapper).toBeTruthy();
});