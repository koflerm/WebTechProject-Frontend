import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { RatingService } from '../core/services/rating.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]|undefined;

  constructor(
    private productService: ProductService,
    private ratingService: RatingService
  ) { }

  ngOnInit(): void {
    this._getAllProducts();
  }

  private _getAllProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    },
    (err) => {
      console.log(`Error retreiving products: ${err.message}`)
    });
  }

  filterProducts(parameters: object): void {
    this.productService.getFilteredProducts(parameters).subscribe((products) => {
      this.products = products;
    },
    (err) => {
      console.log(`Error retreiving products: ${err.message}`)
    });
  }
}
