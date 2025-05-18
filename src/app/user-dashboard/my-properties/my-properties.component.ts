import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <-- أضف هذا

@Component({
  selector: 'app-my-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent {
  constructor(private router: Router) {} // <-- حقن الـ Router

  properties = [
    { id: 1, title: 'عقار في القاهرة', price: 50000, image: 'assets/house1.jpg' },
    { id: 2, title: 'عقار في الإسكندرية', price: 120000, image: 'assets/house2.jpg' }
  ];

  editProperty(id: number) {
    // التنقل إلى صفحة التعديل مع تمرير الـ id
    this.router.navigate(['/edit-property', id]);
  }

  deleteProperty(id: number) {
    this.properties = this.properties.filter(p => p.id !== id);
  }
}
