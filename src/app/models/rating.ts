import { Product } from "./product";
import { User } from "./user";

export class Rating {
    value: number;
    user: User;
    product: Product;

    constructor(value: number, user: User, product: Product) {
        this.value = value;
        this.user = user;
        this.product = product;
    }
}