import LineParser from "../parser/lineParser";
import { IWarehouse } from "../domain/warehouse";
import { IMaterialViewModel } from "../domain/material";

export default class RaportGenerator {
    readonly warehousesLines : LineParser[];
    constructor(warehousesLines : LineParser[]) {
        this.warehousesLines = warehousesLines;
    }

    public getWarehousesReport() : IWarehouse[] {
        
        const warehouses = new Map<string, IWarehouse>();

        this.warehousesLines.forEach(singleLineData => {
            let warhousesWhereMaterialIsAvailable = singleLineData.getWarehouses();
            let material = singleLineData.getMaterial();
            for(let warehouse of warhousesWhereMaterialIsAvailable) {
                if(warehouses.has(warehouse.getName())){
                    let previousWarehouseState = warehouses.get(warehouse.getName()) as IWarehouse;
                    previousWarehouseState.addMaterial(material, warehouse.totalMaterialsAvailable());
                } else {
                    warehouses.set(warehouse.getName(), warehouse);
                }
            }
        });

        const sortedData = Array.from(warehouses.values()).sort(this.sortByTotalAvailabilityInAscending);

        return sortedData;
    }

    public getMaterialsReportBy(warehouse : IWarehouse) {
        const materials = warehouse.getMaterialsAvailabilityDetails();
        return materials.sort(this.sortByMaterialIdInDescendingOrder);
    }

    private sortByMaterialIdInDescendingOrder = (materialOne : IMaterialViewModel, materialSecond : IMaterialViewModel) : number =>
        materialOne.id > materialSecond.id ? 1 : -1;
    
    private sortByTotalAvailabilityInAscending(warehouseOne : IWarehouse, warehouseTwo : IWarehouse) : number {
        if(warehouseOne.totalMaterialsAvailable() > warehouseTwo.totalMaterialsAvailable())
            return -1;
        if(warehouseOne.totalMaterialsAvailable() < warehouseTwo.totalMaterialsAvailable())
            return 1;

        const sortByNameInDescendingOrder = (warehouseOne : IWarehouse, warehouseTwo : IWarehouse) : number => 
            warehouseOne.getName() > warehouseTwo.getName() ? -1 : -1;
        
        return sortByNameInDescendingOrder(warehouseOne, warehouseTwo);
    }
}