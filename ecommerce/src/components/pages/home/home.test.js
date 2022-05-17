import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Home from './home';

configure({ adapter: new Adapter() });

it('renders Home component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Home to mach snapshot', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toBeTruthy();
});