import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Slider from './slider';

configure({ adapter: new Adapter() });

it('Slider to mach snapshot', () => {
    const wrapper = shallow(<Slider />);
    expect(wrapper).toBeTruthy();
});