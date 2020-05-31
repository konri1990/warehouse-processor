import LineParser from "./lineParser";
import { Material } from "../domain/material";

describe('Given line parser', () => {
    it('should return line without modification', () => {
        const inputString = "Test123"
        const lineParser = new LineParser(inputString);
        expect(lineParser.getLine()).toBe(inputString);
    });

    it('should return line empty, when contains ignored sign at the beginning', () => {
        const inputString = "#Test123"
        const lineParser = new LineParser(inputString);
        expect(lineParser.getLine()).toBe("");
    });

    it('should return line empty, when contains white spaces and ignored sign at the beginning', () => {
        const inputString = "   #   Test123"
        const lineParser = new LineParser(inputString);
        expect(lineParser.getLine()).toBe("");
    });

    it('should return material object, when is in correct format', () => {
        const inputString = "CHerry Hardwood Archer Door - PS;COM100001;WH-A,5|WH-B,10"
        const lineParser = new LineParser(inputString);
        const expectedMaterial : Material = {
            name : "CHerry Hardwood Archer Door - PS",
            id : "COM100001"
        };
        expect(lineParser.getMaterial()).toStrictEqual(expectedMaterial);
    });

    it('should return 2 warehouses object, when input contains 2 warehouses data', () => {
        const inputString = 'CHerry Hardwood Archer Door - PS;COM100001;WH-A,5|WH-B,10';
        const lineParser = new LineParser(inputString);
        const warehouseA = lineParser.getWarehouses()[0];
        const warehouseB = lineParser.getWarehouses()[1];

        expect(warehouseA.getName()).toBe('WH-A');
        expect(warehouseB.getName()).toBe('WH-B');
        expect(warehouseA.totalMaterialsAvailable()).toEqual(5);
        expect(warehouseB.totalMaterialsAvailable()).toEqual(10);
    });

    it('should return 1 warehouse object, when input contais data about 1 warehouse', () => {
        const inputString = "Maple Dovetail Drawerbox;COM-124047;WH-A,15";
        const lineParser = new LineParser(inputString);
        const warehouseA = lineParser.getWarehouses()[0];

        expect(warehouseA.getName()).toBe('WH-A');
        expect(warehouseA.totalMaterialsAvailable()).toEqual(15);
    });

    it('should return 3 warehouses object, when input contais data about 3 warehouses', () => {
        const inputString = "Generic Wire Pull;COM-123906c;WH-A,10|WH-B,6|WH-C,2";
        const lineParser = new LineParser(inputString);
        const warehouseA = lineParser.getWarehouses()[0];
        const warehouseB = lineParser.getWarehouses()[1];
        const warehouseC = lineParser.getWarehouses()[2];

        expect(warehouseA.getName()).toBe('WH-A');
        expect(warehouseB.getName()).toBe('WH-B');
        expect(warehouseC.getName()).toBe('WH-C');
        expect(warehouseA.totalMaterialsAvailable()).toEqual(10);
        expect(warehouseB.totalMaterialsAvailable()).toEqual(6);
        expect(warehouseC.totalMaterialsAvailable()).toEqual(2);
    });
});