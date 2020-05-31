import { Warehouse, IWarehouse } from "./warehouse";
import { Material } from "./material";


describe('Given warehouse calculation', () => {
    it('should add properly materials and calculate properly availability', () => {
        const warehouseName = 'WH-A';
        const warehouse : IWarehouse = new Warehouse(warehouseName);
        const materialOne : Material = { id: 'COM100001', name: 'CHerry Hardwood Archer Door - PS' };
        const materialTwo : Material = {id: 'Maple Dovetail Drawerbox', name: 'COM-124047' }
        
        warehouse.addMaterial(materialOne, 5);
        warehouse.addMaterial(materialOne, 10);
        warehouse.addMaterial(materialOne, 5);
        warehouse.addMaterial(materialOne, 15);
        warehouse.addMaterial(materialTwo, 6);
        warehouse.addMaterial(materialTwo, 7);
        
        expect(warehouse.totalMaterialsAvailable()).toBe(48);
        expect(warehouse.getSingleMaterialAvailability(materialOne)).toBe(35);
        expect(warehouse.getSingleMaterialAvailability(materialTwo)).toBe(13);
    });
});