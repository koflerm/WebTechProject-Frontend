import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { CategoryService } from '../core/services/category.service';
import { ProductService } from '../core/services/product.service';
import { RatingService } from '../core/services/rating.service';
import { Category } from '../models/category';
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
    });
  }

  filterProducts(parameters: object): void {
    this.productService.getFilteredProducts(parameters).subscribe((products) => {
      this.products = products;
    });
  }
}
