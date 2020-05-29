import LineParser from "./lineParser";
import { Material } from "../domain/material";
import { Warehouse } from "../domain/warehouse";

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

    it('should return wareshouse object with total materials, when is in correct format', () => {
        const inputString = "CHerry Hardwood Archer Door - PS;COM100001;WH-A,5|WH-B,10"
        const lineParser = new LineParser(inputString);
        const expectedWarhouse : Array<Warehouse> = [
            {name: "WH-A", totalMaterials: 5 },
            {name: "WH-B", totalMaterials: 10 }
        ]
        expect(lineParser.getWarehouses()).toEqual(expectedWarhouse);
    });
});