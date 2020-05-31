import LineParser from "./lineParser";
import { IWarehouse } from "../domain/warehouse";
import { Report } from "../domain/report";
import { IMaterialState } from "../domain/material";

class TextParser {
    public getReport(inputData: string) : string {

        const lines = inputData.split(/\r\n|\r|\n/g);
        const singleLogData = lines.map(line => {
            let lineParser = new LineParser(line);
            return lineParser;
        }).filter(p => p.getLine().length > 1);

        const finalReport : Report = {
            warehouses: new Map<string, IWarehouse>()
        };

        //const warehousesData =
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

        //const sortStringKeys = (a : IWarehouse, b : IWarehouse) => a.getName() > b.getName() ? 1 : -1;
        const sortedData = Array.from(finalReport.warehouses.values()).sort(this.sortByTotalAvailabilityInAscending);
                
        return sortedData.map(warehouse => {
            return `${this.getWarehouseSummaryHeader(warehouse)}${this.getWarehouseDetailsState(warehouse)}`;
        }).join('\n') //maybe use html br
    }

    private getWarehouseSummaryHeader(warehouse : IWarehouse) : string {
        return `${warehouse.getName()} (total ${warehouse.totalMaterialsState()}) \n`;
    }

    private getWarehouseDetailsState(warehouse : IWarehouse) : string {
        const materials = warehouse.getAllMaterialsState();
        return materials.sort(this.sortByMaterialIdInDescendingOrder).map(material => {
            return `${material.id}: ${material.totalAvailability} \n`;
        }).join('');
    }

    private sortByNameInDescendingOrder(warehouseOne : IWarehouse, warehouseTwo : IWarehouse) : number {
        return warehouseOne.getName() > warehouseTwo.getName() ? -1 : -1;
    }

    private sortByTotalAvailabilityInAscending(warehouseOne : IWarehouse, warehouseTwo : IWarehouse) : number {
        if(warehouseOne.totalMaterialsState() > warehouseTwo.totalMaterialsState())
            return -1;
        if(warehouseOne.totalMaterialsState() < warehouseTwo.totalMaterialsState())
            return 1;
        return this.sortByNameInDescendingOrder(warehouseOne, warehouseTwo);
    }

    private sortByMaterialIdInDescendingOrder(materialOne : IMaterialState, materialSecond : IMaterialState) : number {
        return materialOne.id > materialSecond.id ? -1 : 1;
    }
}

export default TextParser;