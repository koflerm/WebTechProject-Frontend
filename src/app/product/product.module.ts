import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingFormComponent } from './components/rating-form/rating-form.component';


@NgModule({
  declarations: [ProductComponent, RatingFormComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FontAwesomeModule,
    SharedModule,
    NgbModule
  ]
})
export class ProductModule { }
