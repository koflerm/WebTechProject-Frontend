import { Category } from "./category";

export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category?: Category;
    average_rating: number;

    constructor(id: string, name?: string, description?: string, price?: number, category?: Category, average_rating?: number) {
        this.id = id;
        this.name = name || '';
        this.description = description || '';
        this.price = price || 0;
        this.category = category;
        this.average_rating = average_rating || 0;
    }
}