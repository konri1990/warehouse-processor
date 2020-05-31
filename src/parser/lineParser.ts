import { Material } from "../domain/material";
import { IWarehouse, Warehouse } from "../domain/warehouse";

class LineParser {
    readonly line : string;
    constructor(inputLine : string) {
        this.line = this.formatLine(inputLine);
    }

    public getLine() : string {
        return this.line;
    }

    public getMaterial(materialSeparator = ";") : Material {
        const splittedLine = this.line.split(materialSeparator);
        return { id : splittedLine[1], name : splittedLine[0] };
    }

    public getWarehouses(warehouseSeparator = "|", warehouseAvailabilitySeparator = ",") : Array<IWarehouse> {
        const splittedLine = this.line.split(";"); //TODO merge with material one
        const warehouses = splittedLine[2].split(warehouseSeparator);
        return warehouses.map<IWarehouse>(warehouseData => {
            let warehouseDetails = warehouseData.split(warehouseAvailabilitySeparator);
            let warehouseName = warehouseDetails[0];
            let warehouseMaterialState = parseInt(warehouseDetails[1]);
            let warehouse : IWarehouse = new Warehouse(warehouseName);
            warehouse.addMaterial(this.getMaterial(), warehouseMaterialState);
            return warehouse;
        });
    }

    private formatLine(inputLine : string) : string {
        const notAllowedSign = '#';
        if(inputLine.trimLeft().indexOf(notAllowedSign, 0) > -1) {
            return "";
        }
        return inputLine;
    }
}

export default LineParser;