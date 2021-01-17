import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  // ratings: Array<Rating> = [
  //   {id: "1", value: 5, user: {name: "John Doe", address: "Doestreet 1", phoneNumber: "+436776868686868", email: "john@doe.com", creditcard: "000000000000", password: "12345"}, product: {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0}},
  //   {id: "2", value: 5, user: {name: "John Doe", address: "Doestreet 1", phoneNumber: "+436776868686868", email: "john@doe.com", creditcard: "000000000000", password: "12345"}, product: {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0}},
  //   {id: "3", value: 3, user: {name: "John Doe", address: "Doestreet 1", phoneNumber: "+436776868686868", email: "john@doe.com", creditcard: "000000000000", password: "12345"}, product: {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0}},
  //   {id: "4", value: 1, user: {name: "John Doe", address: "Doestreet 1", phoneNumber: "+436776868686868", email: "john@doe.com", creditcard: "000000000000", password: "12345"}, product: {id: "1", name: "Adidas Fast 2", description: "A nice shoe from the brand adidas", price: 0}},
  // ];

  constructor(private http: HttpClient) { }

  public getRatingsForProduct(product: Product): Observable<Rating[]> {
    // return new Observable<Rating[]>((subscribers) => {
    //   let ratings: Array<Rating> = [];
    //   for (let rating of this.ratings) {
    //     if (product.id == rating.product.id) {
    //       ratings.push(rating);
    //     }
    //   }
    //   subscribers.next(ratings);
    //   subscribers.complete();
    // });
    return this.http.get('https://webtech.danidipp.com/ratings/' + product.id).pipe(map((response: any) => response.ratings))
  }

  public createRatingForProduct(rating: Rating): Observable<Rating> {
    // return new Observable<boolean>((subscribers) => {
    //   // this.ratings.push(rating);
    //   subscribers.next(true);
    //   subscribers.complete();
    // });
    return this.http.post('https://webtech.danidipp.com/ratings', { product_id: rating.product.id, user_email: rating.user.email, value: rating.value}, { headers: { Authorization: `Bearer ${sessionStorage.getItem('userJWT')}` }}).pipe(map((response: any) => response.rating));
  }
}
