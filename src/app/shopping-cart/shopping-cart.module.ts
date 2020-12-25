import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ShoppingCartComponent, OrderConfirmationComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    NgbModule
  ]
})
export class ShoppingCartModule { }
