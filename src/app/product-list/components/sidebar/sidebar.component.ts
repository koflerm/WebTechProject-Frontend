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
  currentMinPrice: number|undefined;
  currentMaxPrice: number|undefined;
  currentDescription: string|undefined;

  constructor(private categoryService: CategoryService) { 
    this.onFilterUpdate = new EventEmitter();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  updateFilter(): void {
    this.onFilterUpdate.emit({name: this.currentName, price_min: this.currentMinPrice, price_max: this.currentMaxPrice, description: this.currentDescription, category: this.currentCategory});
  }
}
