class LineParser {
    readonly line : string; 
    constructor(inputLine : string) {
        this.line = this.formatLine(inputLine);
    }

    public getLine() {
        return this.line;
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