import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../core/services/product.service';
import { Product } from '../models/product';
import { RatingService } from '../core/services/rating.service';
import { Rating } from '../models/rating';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product|undefined;
  ratings: Array<Rating>;
  productId: string;
  averageRating: number|undefined;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private ratingService: RatingService
  ) { 
    this.productId = this.route.snapshot.paramMap.get('pid')!;
    this.ratings = [];
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
  }
}
