import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../core/services/product.service';
import { Product } from '../models/product';
import { RatingService } from '../core/services/rating.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  images: Array<any>;
  products: Array<Product>|undefined;
  faStar = faStar;
  paused: boolean;
  unpauseOnArrow: boolean;
  pauseOnIndicator: boolean;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  constructor(private productService: ProductService, private ratingService: RatingService) {
    this.images = environment.overviewImages;
    this.paused = false;
    this.unpauseOnArrow = false;
    this.pauseOnIndicator = false;
  }

  togglePaused(): void {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent): void {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  ngOnInit(): void {
    this.productService.getTopRatedProducts().subscribe((products) => {
      this.products = products;
    },
    (err) => {
      console.log(`Error retrieving products: ${err.message}`)
    })
  }
}
