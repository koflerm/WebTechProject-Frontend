import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { InformationModalComponent } from '../shared/components/information-modal/information-modal.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: Product[]|undefined;
  totalPrice;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private modalService: NgbModal,
    private router: Router,
  ) { 
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

  removeFromShoppingCard(product: Product) {
    this.shoppingCart = this.shoppingCartService.removeProductFromShoppingCard(product);
  }

  openOrderModal(): void {
    const ref = this.modalService.open(OrderConfirmationComponent);
    ref.componentInstance.shoppingCart = this.shoppingCart;
    ref.result.then((order: Order) => {
      const informationRef = this.modalService.open(InformationModalComponent);
      informationRef.componentInstance.message = "Order created successfully";
      this.router.navigate(['overview']);
    })
  }
}
