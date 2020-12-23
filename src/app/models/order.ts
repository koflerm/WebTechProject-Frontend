import { Product } from "./product";
import { User } from "./user";

export class Order {
    time: Date;
    description: string;
    state: string;
    user: User;
    products: Array<Product>;

    constructor(description?: string, state?: string, user?: User, products?: Array<Product>) {
        this.time = new Date();
        this.description = description || '';
        this.state = state || '';
        this.user = user || new User();
        this.products = products || [];
    }
}