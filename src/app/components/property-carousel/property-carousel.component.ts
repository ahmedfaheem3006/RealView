import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-carousel.component.html',
  styleUrls: ['./property-carousel.component.css']
})
export class PropertyCarouselComponent {
  @Input() images: string[] = [];
}
