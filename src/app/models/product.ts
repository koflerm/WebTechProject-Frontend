import { Category } from "./category";

export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category?: Category;

    constructor(id: string, name?: string, description?: string, price?: number, category?: Category) {
        this.id = id;
        this.name = name || '';
        this.description = description || '';
        this.price = price || 0;
        this.category = category;
    }
}