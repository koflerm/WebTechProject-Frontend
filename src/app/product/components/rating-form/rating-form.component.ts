import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/core/services/modal.service';
import { RatingService } from 'src/app/core/services/rating.service';
import { Product } from 'src/app/models/product';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent implements OnInit {
  rating: Rating|undefined;
  faStar = faStar;
  @Input() product!: Product;
  @Input() user!: User;
  @Output() onCreateRating: EventEmitter<Rating>;
  rated: boolean;

  constructor(
    private ratingService: RatingService,
    private modalService: ModalService
  ) { 
    this.onCreateRating = new EventEmitter();
    this.rated = false;
  }

  ngOnInit(): void {
    this.rating = new Rating(0, this.user, this.product)
  }

  createRating(): void {
    this.ratingService.createRatingForProduct(this.rating!).subscribe((rating) => {
      this.rated = true;
      this.onCreateRating?.emit(this.rating);
    },
    (err) => {
      if (err.status == 409) {
        this.modalService.openModal(`You cannot rate a product twice`);
      } else {
        console.log(`Error creating rating for product: ${err.message}`)
      }
    })
  }

}
