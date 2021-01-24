import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Rating } from 'src/app/models/rating';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  public getRatingsForProduct(product: Product): Observable<Rating[]> {
    return this.http.get(`${environment.backendURL}/ratings/${product.id}`).pipe(map((response: any) => response.ratings))
  }

  public createRatingForProduct(rating: Rating): Observable<Rating> {
    return this.http.post(`${environment.backendURL}/ratings`, { product_id: rating.product.id, user_email: rating.user.email, value: rating.value}, { headers: { Authorization: `Bearer ${sessionStorage.getItem('userJWT')}` }}).pipe(map((response: any) => response.rating));
  }
}
