import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../core/services/modal.service';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { Order } from '../models/order';
import { Product } from '../models/product';
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
    private ngbModalService: NgbModal,
    private modalService: ModalService
  ) { 
    this.totalPrice = 0;
  }

  ngOnInit(): void {
    this.shoppingCartService.shoppingCartNotifier().subscribe((shoppingCart) => {
      this.shoppingCart = shoppingCart;
      if (this.shoppingCart) {
        this._calculateTotalPrice();
      }
    },
    (err) => {
      console.log(`Error retreiving shopping card items: ${err.message}`)
    })
  }

  _calculateTotalPrice(): void {
    this.totalPrice = 0;
    for (let product of this.shoppingCart!) {
      this.totalPrice = this.totalPrice + product.price;
    }
  }

  removeFromShoppingCard(product: Product) {
    this.shoppingCart = this.shoppingCartService.removeProductFromShoppingCard(product);
  }

  openOrderModal(): void {
    const ref = this.ngbModalService.open(OrderConfirmationComponent);
    ref.componentInstance.shoppingCart = this.shoppingCart;
    ref.result.then((order: Order) => {
      this.modalService.openModal('Order created successfully', 'overview');
    })
  }
}
