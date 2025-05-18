import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-latest-sale-properties',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './latest-sale-properties.component.html',
  styleUrl: './latest-sale-properties.component.css'
})
export class LatestSalePropertiesComponent implements  OnInit {
  properties: any[] = [];
  types: string[] = ['شقة', 'فيلا', 'دوبلكس'];
  locations: string[] = ['القاهرة', 'الجيزة', 'الإسكندرية'];
  selectedType = '';
  selectedLocation = '';
  page = 1;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchProperties();
  }

  fetchProperties() {
    const params: any = {
      page: this.page,
      limit: 8,
      purpose: 'Sale',
      ...(this.selectedType && { type: this.selectedType }),
      ...(this.selectedLocation && { location: this.selectedLocation })
    };

    const headers: any = {
      token: `ahmedEhab ${localStorage.getItem('token')}`
    }
    this.http.get<any>(`https://gradution-project-silk.vercel.app/properties/list?purpose=Sale`, {headers}).subscribe({
      next: (res) => {
        this.properties = res.data;
        console.log(res);
        
      },
      error: (err) => {
        console.error('خطأ في جلب البيانات:', err);
      }
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/property', id]);
  }

  nextPage() {
    this.page++;
    this.fetchProperties();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchProperties();
    }
  }
}
