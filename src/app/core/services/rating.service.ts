import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  ratings: Array<Rating> = [
    {id: "1", value: 5, user: {name: "John Doe", address: "Doestreet 1", phoneNumber: "+436776868686868", email: "john@doe.com", creditcard: "000000000000", password: "12345"}, product: {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0}},
    {id: "2", value: 5, user: {name: "John Doe", address: "Doestreet 1", phoneNumber: "+436776868686868", email: "john@doe.com", creditcard: "000000000000", password: "12345"}, product: {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0}},
    {id: "3", value: 3, user: {name: "John Doe", address: "Doestreet 1", phoneNumber: "+436776868686868", email: "john@doe.com", creditcard: "000000000000", password: "12345"}, product: {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0}},
    {id: "4", value: 1, user: {name: "John Doe", address: "Doestreet 1", phoneNumber: "+436776868686868", email: "john@doe.com", creditcard: "000000000000", password: "12345"}, product: {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0}},
  ];

  constructor() { }

  public getAverageRatingForProduct(product: Product): Observable<number> {
    return new Observable<number>((subscribers) => {
      let count = 0;
      let values = 0;
      for (let rating of this.ratings) {
        if (product.id == rating.product.id) {
          count = count + 1;
          values = values + rating.value;
        }
      }
      subscribers.next(values / count)
      subscribers.complete();
    });
  }

  public getRatingsForProduct(product: Product): Observable<Rating[]> {
    return new Observable<Rating[]>((subscribers) => {
      let ratings: Array<Rating> = [];
      for (let rating of this.ratings) {
        if (product.id == rating.product.id) {
          ratings.push(rating);
        }
      }
      subscribers.next(ratings);
      subscribers.complete();
    });
  }
}
