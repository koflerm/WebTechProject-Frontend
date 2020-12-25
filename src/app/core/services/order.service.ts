import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  public createOrder(products: Product[], user: User): Observable<Order> {
    return new Observable<Order>((subscribers) => {
      let order = new Order("", "Placed", user, products)
      subscribers.next(order);
      subscribers.complete();
    })
  }
}
