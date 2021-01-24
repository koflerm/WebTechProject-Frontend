import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: Category[]|undefined;
  @Output() onFilterUpdate: EventEmitter<object|undefined>;
  currentName: string|undefined;
  currentCategory: string|undefined;
  currentMinPrice: number;
  currentMaxPrice: number;
  currentDescription: string|undefined;

  constructor(private categoryService: CategoryService) { 
    this.onFilterUpdate = new EventEmitter();
    this.currentMinPrice = 1;
    this.currentMaxPrice = 100000
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    },
    (err) => {
      console.log(`Error retrieving categories: ${err.message}`)
    })
  }

  updateFilter(): void {
    this.onFilterUpdate.emit({name: this.currentName, price_min: this.currentMinPrice, price_max: this.currentMaxPrice, description: this.currentDescription, category: this.currentCategory});
  }
}
