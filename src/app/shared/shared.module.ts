import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './components/rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [RatingComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [RatingComponent]
})
export class SharedModule { }
