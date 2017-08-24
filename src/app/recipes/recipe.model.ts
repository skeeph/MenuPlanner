import { Product } from "app/product.model";

export class Recipe {
    // TODO: Единицы измерения
    name: string
    imagePath: string
    description: string
    ingredients: {
        name: string,
        amount: number,
        unit: string
    }[];

    constructor(
        name: string,
        imagePath?: string,
        ingredients?: {
            name: string,
            amount: number,
            unit: string
        }[],
        description?: string) {
        this.name = name;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.description = description;
    }
}