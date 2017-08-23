import { Product } from "app/product.model";

export class Recipe {
    // TODO: Единицы измерения
    name: string
    imagePath: string
    description: string
    ingredients: {
        product: Product,
        quantity: number
    }[];

    constructor(
        name: string,
        imagePath?: string,
        ingredients?: {
            product: Product,
            quantity: number
        }[],
        description?: string) {
        this.name = name;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.description = description;
    }
}