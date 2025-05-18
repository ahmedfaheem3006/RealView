import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-description.component.html',
  styleUrls: ['./property-description.component.css']
})
export class PropertyDescriptionComponent {
  @Input() description!: string;
}
