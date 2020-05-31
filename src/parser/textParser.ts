import LineParser from "./lineParser";
import { IWarehouse } from "../domain/warehouse";
import { IMaterialViewModel } from "../domain/material";
import RaportGenerator from "../services/raportGenerator";

class TextParser {
    private newLineSeparator = '\n';

    public getReport(inputData: string) : string {
        this.throwIfNotValid(inputData);
            
        const splittedLines = this.splitOnLines(inputData);

        const warehousesLines = this.getLinesWithWarehouseData(splittedLines);
        const reportGenerator = new RaportGenerator(warehousesLines);            
        return reportGenerator.getWarehousesReport().map(warehouse => {
            return `${this.getWarehouseSummaryHeader(warehouse)}`
            + `${this.getWarehouseDetailsState(reportGenerator.getMaterialsReportBy(warehouse))}`;
        }).join(this.newLineSeparator);
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

    private splitOnLines = (inputData : string) : string[] => 
        inputData.split(/\r\n|\r|\n/g);

    private getWarehouseSummaryHeader = (warehouse : IWarehouse) : string =>
        `${warehouse.getName()} (total ${warehouse.totalMaterialsAvailable()}) \n`;

    private getWarehouseDetailsState(materials : IMaterialViewModel[]) : string {
        return materials.map(material => {
            return `${material.id}: ${material.totalAvailability} ${this.newLineSeparator}`;
        }).join('');
    }

    private throwIfNotValid(inputData : string) : void {
        //better will be have some nice validation, however it is not in the scope right now
        //will be done in next sprint :)
        const minimumDataLengthRequiredForProcessing = 6;
        if(inputData.length < minimumDataLengthRequiredForProcessing)
            throw new TypeError("Data are not correct. Please insert well formated logs.");
        return;
    }
}

export default TextParser;