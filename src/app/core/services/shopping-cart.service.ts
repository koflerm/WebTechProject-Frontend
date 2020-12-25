import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _shoppingCart: BehaviorSubject<Product[] | undefined>;

  shoppingCart: Array<Product> = [
    {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0},
    {id: "2", name: "Nike Pro 1", description: "A nice shoe from the brand Nike", price: 0},
  ]

  constructor() { 
    this._shoppingCart = new BehaviorSubject<Product[] | undefined>(undefined);
    // temporary code for testing. Remove this afterwards
    sessionStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    this._getShoppingCartFromSession();
  }

  private _getShoppingCartFromSession(): void {
    if (sessionStorage.getItem('shoppingCart')) {
      try {
        const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart')!);
        this._shoppingCart.next(shoppingCart);
      } catch (e) {
        sessionStorage.removeItem('shoppingCart');
      }
    }
  }

  public shoppingCartNotifier(): Observable<Product[] | undefined> {
    return this._shoppingCart.asObservable();
  }

  public addProductToShoppingCard(product: Product): Product[] {
    this.shoppingCart.push(product);
    this._sendShoppingCardUpdate();
    return this.shoppingCart;
  }

  public removeProductFromShoppingCard(product: Product): Product[] {
    for (let currentProduct of this.shoppingCart) {
      if (currentProduct.id == product.id) {
        let index = this.shoppingCart.indexOf(currentProduct);
        this.shoppingCart.splice(index, 1);
        this._sendShoppingCardUpdate();
        break;
      }
    }
    return this.shoppingCart;
  }

  private _sendShoppingCardUpdate(): void {
    this._shoppingCart.next(this.shoppingCart);
  }
}
