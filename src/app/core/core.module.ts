import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports: [NavComponent]
})
export class CoreModule { }
