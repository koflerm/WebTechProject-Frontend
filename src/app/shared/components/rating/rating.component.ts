import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() rating!: number;
  faStar = faStar;

  constructor() { }

  calculateRatingStars(): Array<number> {
    return Array(Math.round(this.rating)).fill(4);
  }

  calculateGreyStars(): Array<number> {
    return Array(5 - Math.round(this.rating!)).fill(4);
  }
}
