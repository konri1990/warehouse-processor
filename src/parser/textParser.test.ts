import TextParser from "./textParser";

describe('Given get report from text parser', () => {
    const textParser = new TextParser();
    it('should return expected report with ordered values', () => {
        const inputString = "   #   Test123 \n"
        + "CHerry Hardwood Archer Door - PS;COM-100001;WH-A,5|WH-B,10 \n"
        + "Maple Dovetail Drawerbox;COM-124047;WH-A,15 \n"
        + "Generic Wire Pull;COM-123906c;WH-A,10|WH-B,6|WH-C,2 \n";
        
        const expectedOutput = "WH-A (total 30) \n"
        + "COM-100001: 5 \n"
        + "COM-123906c: 10 \n"
        + "COM-124047: 15 \n"
        + "\n"
        + "WH-B (total 16) \n"
        + "COM-100001: 10 \n"
        + "COM-123906c: 6 \n"
        + "\n"
        + "WH-C (total 2) \n"
        + "COM-123906c: 2 \n";

        expect(textParser.getReport(inputString)).toEqual(expectedOutput);
    });
});