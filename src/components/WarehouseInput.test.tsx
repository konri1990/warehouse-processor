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
        const inputValue = "CHerry Hardwood Archer Door - PS;COM100001;WH-A,5|WH-B,10 \n";
        const expectedOutput = "WH-B (total 10) \n"
        + "COM100001: 10 \n"
        + "\n"
        + "WH-A (total 5) \n"
        + "COM100001: 5 \n";

        textArea.simulate('change', { target: {value : inputValue }} )
        
        expect(component.find('#warehouse-report-output').text()).toEqual(expectedOutput);
    });
});