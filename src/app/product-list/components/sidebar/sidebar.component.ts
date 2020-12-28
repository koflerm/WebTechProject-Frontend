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
  @Output() onCategorySelect: EventEmitter<Category|undefined>;
  @Output() onSearchInput: EventEmitter<string>;
  searchText: string;

  constructor(private categoryService: CategoryService) { 
    this.onCategorySelect = new EventEmitter();
    this.onSearchInput = new EventEmitter();
    this.searchText = '';
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  filterForCategory(category: Category|undefined): void {
    this.onCategorySelect.emit(category);
  }

  searchForName(): void {
    this.onSearchInput.emit(this.searchText);
  }
}
