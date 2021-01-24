import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../core/services/product.service';
import { Product } from '../models/product';
import { RatingService } from '../core/services/rating.service';
import { Rating } from '../models/rating';
import { User } from '../models/user';
import { UserService } from '../core/services/user.service';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product|undefined;
  ratings: Array<Rating>;
  productId: string;
  averageRating: number;
  user: User|undefined;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private ratingService: RatingService,
    private userService: UserService,
    private shoppingCardService: ShoppingCartService,
    private modalService: ModalService,
  ) { 
    this.productId = this.route.snapshot.paramMap.get('pid')!;
    this.ratings = [];
    this.averageRating = 0;
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      this.product = product;
      this.ratingService.getRatingsForProduct(product).subscribe((ratings: Array<Rating>) => {
        this.ratings = ratings;
      },
      (err) => {
        console.log(`Error retreiving ratings for product: ${err.message}`)
      });
    },
    (err) => {
      console.log(`Error retreiving product: ${err.message}`)
    })
    this.userService.userNotifier().subscribe((user) => {
      this.user = user;
    },
    (err) => {
      console.log(`Error retreiving user: ${err.message}`)
    })
  }

  addRating(rating: Rating) {
    this.ratings.push(rating);
  }

  addToShoppingCard(product: Product) {
    this.shoppingCardService.addProductToShoppingCard(product);
    this.modalService.openModal(`${product.name} successfully added to shopping cart.`, 'overview');
  }
}
