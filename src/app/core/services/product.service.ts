import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // products: Array<Product> = [
  //   {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0, category: new Category("Shoes")},
  //   {id: "2", name: "Nike Pro 1", description: "A nice shoe from the brand Nike", price: 0, category: new Category("Shoes")},
  //   {id: "3", name: "Voeslauer", description: "A nice mineral water from the brand Voeslauer", price: 0, category: new Category("Water")},
  //   {id: "4", name: "Tiroler Quelle", description: "A nice mineral water from the brand Tiroler Quelle", price: 0, category: new Category("Water")},
  // ];

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    // return new Observable<Array<Product>>((subscribers) => {
    //   subscribers.next(this.products);
    //   subscribers.complete;
    // });
    return this.http.get('https://webtech.danidipp.com/products').pipe(map((products: any) => products.products))
  }

  public getProductById(id: string): Observable<Product> {
    // return new Observable<Product>((subscribers) => {
    //   let productFound: boolean = false;
    //   for (let product of this.products) {
    //     if (product.id == id) {
    //       subscribers.next(product);
    //       subscribers.complete;
    //       productFound = true;
    //     }
    //   }
    //   if (!productFound) {
    //     subscribers.error('No product found');
    //   }
    // });
    return this.http.get('https://webtech.danidipp.com/products/' + id).pipe(map((products: any) => products.product))
  }

  // public getBestsellerProducts(): Observable<Array<Product>> {
  //   return new Observable<Array<Product>>((subscribers) => {
  //     subscribers.next(this.products);
  //     subscribers.complete;
  //   });
  // }

  public getFilteredProducts(parameters: object): Observable<Array<Product>> {
    let queryString = ""
    for (const [key, value] of Object.entries(parameters)) {
      if (value) {
        if (queryString == "") {
          queryString = `?${key}=${value}`;
        } else {
          queryString = queryString + `&${key}=${value}`;
        }
      }
    }
    return this.http.get('https://webtech.danidipp.com/products/search/' + queryString).pipe(map((products: any) => products.products))
  }
}
