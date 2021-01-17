import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/core/services/order.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { UserService } from 'src/app/core/services/user.service';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  @Input() shoppingCart!: Product[];
  user: User|undefined;

  constructor(
    public modal: NgbActiveModal,
    private orderService: OrderService,
    private shoppingCardService: ShoppingCartService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.userNotifier().subscribe((user) => {
      this.user = user;
    });
  }

  orderProducts(): void {
    let openProducts = this.shoppingCart;
    for (let product of this.shoppingCart) {
      this.orderService.createOrder(product, this.user!).subscribe((order: Order) => {
        let index = openProducts.indexOf(product);
        openProducts.splice(index, 1);
        if (openProducts.length == 0) {
          this.shoppingCardService.clearShoppingCart();
          this.modal.close(order);
        }
      });
    }
  }

}
