import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get(`${environment.backendURL}/products`).pipe(map((products: any) => products.products))
  }

  public getTopRatedProducts(): Observable<Product[]> {
    return this.http.get(`${environment.backendURL}/products`).pipe(
      map((products: any) => products.products.sort((a: Product, b: Product) => (a.average_rating < b.average_rating) ? 1 : (a.average_rating === b.average_rating) ? ((a.average_rating < b.average_rating) ? 1 : -1) : -1 ).splice(0, 6)))
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get(`${environment.backendURL}/products/${id}`).pipe(map((products: any) => products.product))
  }

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
    return this.http.get(`${environment.backendURL}/products/search/${queryString}`).pipe(map((products: any) => products.products))
  }
}
