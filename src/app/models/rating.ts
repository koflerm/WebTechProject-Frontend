import { Product } from "./product";
import { User } from "./user";

export class Rating {
    id?: string;
    value: number;
    user: User;
    product: Product;

    constructor(value: number, user: User, product: Product, id?: string) {
        if (id) {
            this.id = id;
        }
        this.value = value;
        this.user = user;
        this.product = product;
    }
}