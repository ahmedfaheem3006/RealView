import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-filter',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './propertyfilter.component.html',
  styleUrls: ['./propertyfilter.component.css']
})
export class PropertyFilterComponent {
  filter = {
    type: '',
    minPrice: null,
    maxPrice: null,
    location: ''
  };

  @Output() filterChanged = new EventEmitter<any>();

  constructor() {}

  applyFilter() {
    this.filterChanged.emit(this.filter);
  }
}
