import React, { useEffect, useState } from 'react';
import TextParser from '../parser/textParser';
import { TextField } from '@material-ui/core';

interface IWarehouseOutput {
    logsData : string
} 

export const WarehouseOutput : React.FC<IWarehouseOutput> = ({logsData}) => {
    const [warehouseReport, setWarehouseReport] = useState(logsData);

    useEffect(() => {
        const textParser = new TextParser();
        console.log(logsData);
        if(logsData.length > 1) {
            setWarehouseReport(textParser.getReport(logsData));
        }
    }, [logsData]);

    return (
    <div>
        <TextField
            placeholder="Here will be displayed formatted logs"
            multiline
            fullWidth
            id="warehouse-report-output"
            value={warehouseReport}
        />
    </div>
    )
}