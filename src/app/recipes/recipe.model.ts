import { UUID } from 'angular2-uuid';

export class Recipe {
    uuid: string
    name: string
    imagePath: string
    description: string
    publ: boolean;

    ingredients: {
        name: string,
        amount: number,
        unit: string
    }[];

    // TODO: Public and private recipes
    generateId() {
        this.uuid = UUID.UUID()
    }

    constructor(
        name: string,
        imagePath?: string,
        ingredients?: {
            name: string,
            amount: number,
            unit: string
        }[],
        description?: string,
        publ?: boolean) {
        this.generateId();
        this.name = name;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.description = description;

        if (publ) {
            this.publ = publ;
        } else {
            publ = false;
        }
    }
}