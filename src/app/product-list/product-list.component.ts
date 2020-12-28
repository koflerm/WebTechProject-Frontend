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
  currentCategory: Category|undefined;

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

  getAverageRating(product: Product): Observable<number> {
    return this.ratingService.getAverageRatingForProduct(product);
  }

  filterProducts(category: Category|undefined): void {
    if (!category) {
      this.currentCategory = undefined;
      this._getAllProducts();
    } else {
      this.currentCategory = category;
      this.productService.getProductsForCategory(category!).subscribe((products) => {
        this.products = products;
      });
    }
  }

  filterProductsByName(name: string): void {
    if (this.currentCategory) {
      this.productService.getProductsForName(name, this.currentCategory).subscribe((products) => {
        this.products = products;
      });
    } else {
      this.productService.getProductsForName(name).subscribe((products) => {
        this.products = products;
      });
    }
  }

}
