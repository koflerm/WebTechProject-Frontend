import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // categories: Category[] = [
  //   { name: "Shoes"},
  //   { name: "Water"}
  // ]

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    // return new Observable<Category[]>((subscribers) => {
    //   subscribers.next(this.categories);
    //   subscribers.complete();
    // });
    return this.http.get('https://webtech.danidipp.com/categories').pipe(map((response: any) => response.categories))
  }
}
