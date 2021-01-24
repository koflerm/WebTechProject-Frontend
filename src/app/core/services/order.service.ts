import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public createOrder(product: Product, user: User): Observable<Order> {
    return this.http.post(`${environment.backendURL}/orders`, { time: new Date(), status: "New Order", product_id: product.id}, { headers: { Authorization: `Bearer ${sessionStorage.getItem('userJWT')}` }}).pipe(map((response: any) => response.order));
  }
}
