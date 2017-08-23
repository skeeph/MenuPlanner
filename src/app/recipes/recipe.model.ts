import { Product } from "app/product.model";

export class Recipe {
    name: string
    ingredients: {
        product: Product,
        quantity: number
    }[];

    constructor(
        name: string,
        ingredients?: {
            product: Product,
            quantity: number
        }[]) {
        this.name = name;
        this.ingredients = ingredients;
    }
}