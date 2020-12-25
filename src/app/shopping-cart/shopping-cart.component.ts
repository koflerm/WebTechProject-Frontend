import { Component, OnInit } from '@angular/core';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: Product[]|undefined;
  totalPrice;

  constructor(private shoppingCartService: ShoppingCartService) { 
    this.totalPrice = 0;
  }

  ngOnInit(): void {
    this.shoppingCartService.shoppingCartNotifier().subscribe((shoppingCart) => {
      this.shoppingCart = shoppingCart;
      if (this.shoppingCart) {
        this._calculateTotalPrice();
      }
    })
  }

  _calculateTotalPrice(): void {
    for (let product of this.shoppingCart!) {
      this.totalPrice = this.totalPrice + product.price;
    }
  }

}
