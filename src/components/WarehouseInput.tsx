import React, { useState } from 'react';
import TextParser from '../parser/textParser';

function WarehouseInput() {
    const [warehouseLogs, setWarehouseLogs] = useState("");
    const [warehouseReport, setWarehouseReport ] = useState("");
    const textParser = new TextParser();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let report = textParser.getReport(event.target.value);
        setWarehouseReport(report);
        setWarehouseLogs(event.target.value);
    };

    return (
    <div>
        <div>
            <textarea 
                id="warehouse-logs-input" 
                value={warehouseLogs}
                onChange={handleChange} 
            />
        </div>
        <div>
            <p id="warehouse-report-output">
                {warehouseReport}
            </p>
        </div>
    </div>
    )
}

export default WarehouseInput;