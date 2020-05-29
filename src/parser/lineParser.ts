import { Material } from "../domain/material";
import { Warehouse } from "../domain/warehouse";

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

    public getWarehouses(warehouseSeparator = "|", warehouseAvailabilitySeparator = ",") : Array<Warehouse> {
        const splittedLine = this.line.split(";"); //TODO merge with material one
        const warehouses = splittedLine[2].split(warehouseSeparator);
        return warehouses.map(warehouse => {
            let warehouseDetails = warehouse.split(warehouseAvailabilitySeparator);
            return {name: warehouseDetails[0], totalMaterials: parseInt(warehouseDetails[1]) };
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