import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../core/services/product.service';
import { Product } from '../models/product';
import { RatingService } from '../core/services/rating.service';
import { Rating } from '../models/rating';
import { Observable } from 'rxjs';

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
    this.images = [
      { src: 'assets/img/handshake.jpg', title: 'Trusted by 1.000.000+ customers' },
      { src: 'https://wallpapercrafter.com/desktop/292420-dog-friendship-nature-trust-labrador-snout.jpg', title: 'We like dogs.' },
      { src: 'https://pixelz.cc/wp-content/uploads/2018/09/digital-security-lock-uhd-4k-wallpaper.jpg', title: 'Your data is highly secured.' },
      { src: 'https://www.itl.cat/pngfile/big/303-3032161_donald-trump-wallpaper-background-kim-jong-un-ok.jpg', title: 'Recommended by celebrities.' }
    ];
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
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }
  
  calculateRatingStars(rating: number): Array<number> {
    return Array(Math.round(rating)).fill(4);
  }

  calculateGreyStars(rating: number): Array<number> {
    return Array(5 - Math.round(rating)).fill(4);
  }

  getAverageRating(product: Product): Observable<number> {
    return this.ratingService.getAverageRatingForProduct(product)
  }
}
