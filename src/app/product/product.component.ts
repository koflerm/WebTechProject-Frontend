import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../core/services/product.service';
import { Product } from '../models/product';
import { RatingService } from '../core/services/rating.service';
import { Rating } from '../models/rating';
import { User } from '../models/user';
import { UserService } from '../core/services/user.service';

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
    private userService: UserService
  ) { 
    this.productId = this.route.snapshot.paramMap.get('pid')!;
    this.ratings = [];
    this.averageRating = 0;
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      this.product = product;
      this.ratingService.getAverageRatingForProduct(product).subscribe((rating) => {
        this.averageRating = rating;
      });
      this.ratingService.getRatingsForProduct(product).subscribe((ratings: Array<Rating>) => {
        this.ratings = ratings;
      });
    })
    this.userService.userNotifier().subscribe((user) => {
      this.user = user;
    })
  }

  addRating(rating: Rating) {
    console.log(rating);
    this.ratings.push(rating);
    this.ratingService.getAverageRatingForProduct(this.product!).subscribe((rating) => {
      this.averageRating = rating;
    });
  }
}
