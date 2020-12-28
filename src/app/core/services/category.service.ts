import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[] = [
    { name: "Shoes"},
    { name: "Water"}
  ]

  public getCategories(): Observable<Category[]> {
    return new Observable<Category[]>((subscribers) => {
      subscribers.next(this.categories);
      subscribers.complete();
    });
  }
}
