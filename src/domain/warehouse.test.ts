import { Warehouse, IWarehouse } from "./warehouse";
import { Material } from "./material";


describe('Given warehouse calculation', () => {
    it('should return line without modification', () => {
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
        
        expect(warehouse.totalMaterialsState()).toBe(48);
        expect(warehouse.getMaterialState(materialOne)).toBe(35);
        expect(warehouse.getMaterialState(materialTwo)).toBe(13);
    });
});