import TextParser from "./textParser";


describe('Given text parser and input string', () => {
    it('should return array with 3 line parser objects', () => {
        const inputString = "   #   Test123 \n"
        + "CHerry Hardwood Archer Door - PS;COM100001;WH-A,5|WH-B,10 \n"
        + "Maple Dovetail Drawerbox;COM-124047;WH-A,15 \n"
        + "Generic Wire Pull;COM-123906c;WH-A,10|WH-B,6|WH-C,2 \n";
        
        const textParser = new TextParser();
        expect(textParser.getReport(inputString)).toEqual(inputString);
    });
});