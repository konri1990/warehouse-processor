import { Material } from "../domain/material";
import { IWarehouse, Warehouse } from "../domain/warehouse";

class LineParser {
    readonly line : string;
    readonly parseDataSeparator : string;
    
    constructor(inputLine : string) {
        this.line = this.formatLine(inputLine);
        this.parseDataSeparator = ';';
    }

    public getLine = () : string => this.line ?? "";

    public getMaterial() : Material {
        const parsedData = this.parseData();
        if(parsedData.length <= 2){
            throw new TypeError("Logs are provided in incorrect format!");
        }
        return { id : parsedData[1], name : parsedData[0] };
    }

    public getWarehouses(warehouseSeparator = "|", warehouseAvailabilitySeparator = ",") : Array<IWarehouse> {
        const parsedData = this.parseData();
        if(parsedData.length < 3){
            console.log(parsedData);
            throw new TypeError("Data for warehouse not provided. Requirments not meet!");
        }

        const warehouses = parsedData[2].split(warehouseSeparator);
        return warehouses.map<IWarehouse>(warehouseData => {
            let warehouseDetails = warehouseData.split(warehouseAvailabilitySeparator);
            let warehouseName = warehouseDetails[0];
            let warehouseMaterialState = parseInt(warehouseDetails[1]);
            let warehouse : IWarehouse = new Warehouse(warehouseName);
            warehouse.addMaterial(this.getMaterial(), warehouseMaterialState);
            return warehouse;
        });
    }
    
    private parseData = () => this.line.split(this.parseDataSeparator);

    private formatLine(inputLine : string) : string {
        const notAllowedSign = '#';
        if(inputLine.trimLeft().indexOf(notAllowedSign, 0) > -1) {
            return "";
        }
        return inputLine;
    }
}

export default LineParser;