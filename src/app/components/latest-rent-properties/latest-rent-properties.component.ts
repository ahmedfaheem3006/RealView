import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-latest-rent-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './latest-rent-properties.component.html',
  styleUrls: ['./latest-rent-properties.component.css']
})
export class LatestRentPropertiesComponent implements OnInit {
  properties: Property[] = [];
  types: string[] = ['شقة', 'فيلا', 'استوديو'];
  locations: string[] = ['القاهرة', 'الجيزة', 'الإسكندرية'];

  selectedType: string = '';
  selectedLocation: string = '';
  page: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProperties();
  }

  fetchProperties() {
    const params: any = {
      page: this.page,
      limit: 8,
      purpose: 'rent',
      ...(this.selectedType && { type: this.selectedType }),
      ...(this.selectedLocation && { location: this.selectedLocation })
    };

    const headers: any = {
      token: `ahmedEhab ${localStorage.getItem('token')}`
    };

    this.http.get<any>('https://gradution-project-silk.vercel.app/properties/list?purpose=Rent', { headers })
      .subscribe({
        next: (res) => {
          this.properties = res.data;
          console.log("res", res);
        },
        error: (err) => {
          console.error('خطأ في جلب البيانات:', err);
        }
      });
  }
}

interface Property {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  rooms: number;
  bathrooms: number;
  area: number;
  type: string;
  location: string;
  purpose: string;
}