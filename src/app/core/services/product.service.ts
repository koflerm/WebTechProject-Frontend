import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Array<Product> = [
    {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0},
    {id: "2", name: "Nike Pro 1", description: "A nice shoe from the brand Nike", price: 0},
    {id: "3", name: "Voeslauer", description: "A nice mineral water from the brand Voeslauer", price: 0},
    {id: "4", name: "Tiroler Quelle", description: "A nice mineral water from the brand Tiroler Quelle", price: 0},
  ];

  constructor() { }

  public getProducts(): Observable<Array<Product>> {
    return new Observable<Array<Product>>((subscribers) => {
      subscribers.next(this.products);
      subscribers.complete;
    });
  }

  public getProductById(id: string): Observable<Product> {
    return new Observable<Product>((subscribers) => {
      let productFound: boolean = false;
      for (let product of this.products) {
        if (product.id == id) {
          subscribers.next(product);
          subscribers.complete;
          productFound = true;
        }
      }
      if (!productFound) {
        subscribers.error('No product found');
      }
    });
  }

  public getBestsellerProducts(): Observable<Array<Product>> {
    return new Observable<Array<Product>>((subscribers) => {
      subscribers.next(this.products);
      subscribers.complete;
    });
  }

  public getProductsForCategory(category: Category): Observable<Array<Product>> {
    return new Observable<Array<Product>>((subscribers) => {
      let categoryProducts: Array<Product> = [];
      for (let product of this.products) {
        if (product.category == category) {
          categoryProducts.push(product);
        }
      }
      subscribers.next(this.products);
      subscribers.complete;
    });
  }
}
