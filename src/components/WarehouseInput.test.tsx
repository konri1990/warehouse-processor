import React from 'react';
import { shallow } from 'enzyme';
import WarehouseInput from './WarehouseInput';

describe('Given text parser and input string', () => {
    const component = shallow(<WarehouseInput />);
    
    it('renders the component', () => {
        expect(component).toMatchSnapshot();
    });
    
    it('Text area value change, then paragraph output change too', () => {
        const textArea = component.find('#warehouse-logs-input');
        const inputValue = "Logs from warehouse";
        textArea.simulate('change', { target: {value : inputValue }} )
        expect(component.find('#warehouse-report-output').text().length).toEqual(inputValue.length);
    });
});