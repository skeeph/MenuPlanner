import { Product } from "app/product.model";
import { UUID } from 'angular2-uuid';

export class Recipe {
    id: string
    name: string
    imagePath: string
    description: string
    ingredients: {
        name: string,
        amount: number,
        unit: string
    }[];

    generateId(){
        this.id = UUID.UUID()
    }

    constructor(
        name: string,
        imagePath?: string,
        ingredients?: {
            name: string,
            amount: number,
            unit: string
        }[],
        description?: string) {
        this.generateId();
        this.name = name;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.description = description;
    }    
}