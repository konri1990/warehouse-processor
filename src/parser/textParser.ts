import LineParser from "./lineParser";
import { IWarehouse } from "../domain/warehouse";
import { Report } from "../domain/report";
import { IMaterialState } from "../domain/material";

class TextParser {
    private minimumDataLengthRequiredForProcessing : number = 6;

    public getReport(inputData: string) : string {
        if(inputData.length < this.minimumDataLengthRequiredForProcessing)
            return "Data are not correct. Please insert well formated logs.";
            
        const lines = this.getAllLines(inputData);

        const singleLogData = this.getLinesWithWarehouseData(lines);

        const finalReport : Report = {
            warehouses: new Map<string, IWarehouse>()
        };

        singleLogData.forEach(singleLineData => {
            let warhouses = singleLineData.getWarehouses();
            let material = singleLineData.getMaterial();
            for(let warehouse of warhouses) {
                if(finalReport.warehouses.has(warehouse.getName())){
                    let previousWarehouseState = finalReport.warehouses.get(warehouse.getName()) as IWarehouse;
                    previousWarehouseState.addMaterial(material, warehouse.totalMaterialsState());
                } else {
                    finalReport.warehouses.set(warehouse.getName(), warehouse);
                }
            }
        });

        const sortedData = Array.from(finalReport.warehouses.values()).sort(this.sortByTotalAvailabilityInAscending);
                
        return sortedData.map(warehouse => {
            return `${this.getWarehouseSummaryHeader(warehouse)}${this.getWarehouseDetailsState(warehouse)}`;
        }).join('\n');
    }

    getLinesWithWarehouseData(logLines: string[]) : LineParser[] {
        if(logLines.length < 1)
            return [] as LineParser[];
        
        return logLines.map(this.toParserLine).filter(this.byWarehouseData);
    }

    private byWarehouseData = (lineParsed : LineParser) => 
        lineParsed.getLine().length > 1;

    private toParserLine = (logLine : string) : LineParser => 
        new LineParser(logLine);

    private getAllLines = (inputData : string) : string[] => 
        inputData.split(/\r\n|\r|\n/g);

    private getWarehouseSummaryHeader = (warehouse : IWarehouse) : string =>
        `${warehouse.getName()} (total ${warehouse.totalMaterialsState()}) \n`;

    private getWarehouseDetailsState(warehouse : IWarehouse) : string {
        const materials = warehouse.getAllMaterialsState();
        return materials.sort(this.sortByMaterialIdInDescendingOrder).map(material => {
            return `${material.id}: ${material.totalAvailability} \n`;
        }).join('');
    }

    private sortByTotalAvailabilityInAscending(warehouseOne : IWarehouse, warehouseTwo : IWarehouse) : number {
        if(warehouseOne.totalMaterialsState() > warehouseTwo.totalMaterialsState())
            return -1;
        if(warehouseOne.totalMaterialsState() < warehouseTwo.totalMaterialsState())
            return 1;

        const sortByNameInDescendingOrder = (warehouseOne : IWarehouse, warehouseTwo : IWarehouse) : number => 
            warehouseOne.getName() > warehouseTwo.getName() ? -1 : -1;
        
        return sortByNameInDescendingOrder(warehouseOne, warehouseTwo);
    }

    private sortByMaterialIdInDescendingOrder = (materialOne : IMaterialState, materialSecond : IMaterialState) : number =>
        materialOne.id > materialSecond.id ? 1 : -1;
}

export default TextParser;