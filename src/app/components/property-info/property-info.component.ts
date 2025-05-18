import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.css']
})
export class PropertyInfoComponent {
  @Input() type!: string;
  @Input() rooms!: number;
  @Input() area!: number;
  @Input() price!: number;
}
