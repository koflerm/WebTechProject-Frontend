import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductListComponent, SidebarComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProductListModule { }
