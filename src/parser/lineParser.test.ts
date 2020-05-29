import LineParser from "./lineParser";

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

    it('should return line empty, when contains white spaces', () => {
        const inputString = "   #   Test123"
        const lineParser = new LineParser(inputString);
        expect(lineParser.getLine()).toBe("");
    });
});