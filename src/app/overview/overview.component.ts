import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  images = [
    { src: 'assets/img/handshake.jpg', title: 'Trusted by 1.000.000+ customers' },
    { src: 'https://wallpapercrafter.com/desktop/292420-dog-friendship-nature-trust-labrador-snout.jpg', title: 'We like dogs.' },
    { src: 'https://pixelz.cc/wp-content/uploads/2018/09/digital-security-lock-uhd-4k-wallpaper.jpg', title: 'Your data is highly secured.' },
    { src: 'https://www.itl.cat/pngfile/big/303-3032161_donald-trump-wallpaper-background-kim-jong-un-ok.jpg', title: 'Recommended by celebrities.' }
  ];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
