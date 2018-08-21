import React from 'react';
import ReactDOM from 'react-dom';
import Autocompleter from "../Autocompleter";
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Autocompleter />, div);
});

it('it should show clear button', () => {
    const wrapper = mount(<Autocompleter />);
    wrapper.find('input').simulate('change', {target: {value: 'a'}});
    const svgList = wrapper.find('svg');
    expect(wrapper.state('showClearButton')).toBe(true);
    expect(svgList.length).toBe(2);
});

it('it should show clear button and remove it when value changed', () => {
    const wrapper = mount(<Autocompleter />);
    wrapper.find('input').simulate('change', {target: {value: 'a'}});
    let svgList = wrapper.find('svg');
    expect(wrapper.state('showClearButton')).toBe(true);
    expect(svgList.length).toBe(2);
    wrapper.find('input').simulate('change', {target: {value: ''}});
    svgList = wrapper.find('svg');
    expect(wrapper.state('showClearButton')).toBe(false);
    expect(svgList.length).toBe(1);
});

it('it should show clear button and clear value when click that button', () => {
    const wrapper = mount(<Autocompleter />);
    wrapper.find('input').simulate('change', {target: {value: 'a'}});
    let clearIcon = wrapper.find('svg').first();
    clearIcon.simulate('click');
    expect(wrapper.state('search')).toBe('');
});

it('it should not get data if input less than 3', () => {
    const wrapper = mount(<Autocompleter />);
    wrapper.find('input').simulate('change', {target: {value: 'tr'}});
    wrapper.update();
    expect(wrapper.state('data')).toBe(null);
});

it('it should get data if input more than 2', () => {
    const wrapper = mount(<Autocompleter />);
    wrapper.find('input').simulate('change', {target: {value: 'tru'}});
    setTimeout(() => {
        expect(wrapper.state('data')).not.toBe(null);
    }, 0);

});