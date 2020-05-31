import { Material, IMaterialState } from "./material";

export interface IWarehouse {
    getName() : string;
    addMaterial(material : Material, totalMaterials : number) : void;
    totalMaterialsState() : number;
    getMaterialState(material : Material) : number;
    getAllMaterialsState() : IMaterialState[];
}

export class Warehouse implements IWarehouse {
    private name: string;
    private materials : Map<Material, number>;

    constructor(name : string){
        this.name = name;
        this.materials = new Map<Material, number>();
    }

    getAllMaterialsState(): IMaterialState[] {
        return Array.from(this.materials.keys()).map(material => {
            return { id : material.id, totalAvailability : this.getMaterialState(material) }
        });
    }

    getMaterialState(material : Material): number {
        return this.materials.get(material) ?? 0;
    }

    public totalMaterialsState() : number {
        let materialsState = Array.from(this.materials.values());
        let totalMaterials = materialsState.reduce((materialPreviousState, materialCurrentState) => {
            return (materialPreviousState + materialCurrentState);
        });
        return totalMaterials;
    }

    getName(): string {
        return this.name;
    }

    addMaterial(material: Material, totalMaterials: number) : void {
        const currentStateInWarehouse = this.materials.get(material) ?? 0;
        this.materials.set(material, currentStateInWarehouse + totalMaterials);
    }
}