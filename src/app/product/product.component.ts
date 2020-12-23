import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../core/services/product.service';
import { Product } from '../models/product';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product|undefined;
  productId: string;
  faStar = faStar;

  constructor(private productService: ProductService, private route: ActivatedRoute) { 
    this.productId = this.route.snapshot.paramMap.get('pid')!;
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      this.product = product;
    })
  }

}
