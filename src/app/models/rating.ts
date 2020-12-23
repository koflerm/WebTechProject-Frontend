import { Product } from "./product";
import { User } from "./user";

export class Rating {
    id: string;
    value: number;
    user: User;
    product: Product;

    constructor(id: string, value: number, user: User, product: Product) {
        this.id = id;
        this.value = value;
        this.user = user;
        this.product = product;
    }
}