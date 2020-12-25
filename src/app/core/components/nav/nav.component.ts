import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from 'src/app/models/product';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User | undefined;
  faShoppingCart = faShoppingCart;
  shoppingCart: Product[] | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private modalService: ModalService
  ) { 
    
  }

  ngOnInit(): void {
    this.userService.userNotifier().subscribe((user) => {
      this.user = user;
      this.router.navigate(['overview']);
    });
    this.shoppingCartService.shoppingCartNotifier().subscribe(shopppingCart => {
      this.shoppingCart = shopppingCart;
    });
  }

  logoutUser(): void {
    this.userService.logoutUser();
    this.modalService.openModal(`Logged out successfully.`, 'overview');
  }
}
