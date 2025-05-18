import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-categories.component.html',
  styleUrls: ['./property-categories.component.css']
})
export class PropertyCategoriesComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }
}
