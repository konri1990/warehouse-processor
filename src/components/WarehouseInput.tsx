import React from 'react';
import { TextField } from '@material-ui/core';

export interface IWarehouseInput {
    warehouseLogs : string,
    setWarehouseLogs : React.Dispatch<React.SetStateAction<string>>
}

export const WarehouseInput : React.FC<IWarehouseInput> = (props) => {

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(!(event.target.value.length > 1))
            return;
        props.setWarehouseLogs(event.target.value);
    };

return (
    <div>
        <TextField
            placeholder="Pass here logs from warehouses..."
            multiline
            fullWidth
            id="warehouse-logs-input" 
            defaultValue={props.warehouseLogs}
            onChange={handleChange} 
        />
    </div>
    )
}