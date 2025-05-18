import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
@Component({
  selector: 'app-propertycard',
  imports: [RouterModule,CommonModule],
  templateUrl: './propertycard.component.html',
  styleUrl: './propertycard.component.css'
})
export class PropertycardComponent {
  @Input() property: any; // Receiving property data from parent component

}
