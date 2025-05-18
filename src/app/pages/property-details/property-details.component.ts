// src/app/components/property-details/property-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf, NgFor, DecimalPipe, DatePipe } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DecimalPipe, DatePipe],
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  property?: Property;
  message?: string;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? idParam.trim() : null;

    if (!id) {
      console.error('المعرف غير موجود في الرابط');
      return;
    }

    this.propertyService.getPropertyById(id).subscribe({
      next: (response) => {
        this.property = response.data;
      },
      error: (err) => {
        console.error('فشل في جلب بيانات العقار:', err);
      }
    });
  }

  addToFavorites(): void {
    if (this.property) {
      this.http.post(`https://gradution-project-silk.vercel.app/cart/add/67e45ee86b1d08da665bce6e`, {
        propertyId: this.property._id
      }).subscribe({
        next: () => alert('تم إضافة العقار إلى المفضلة'),
        error: () => alert('حدث خطأ أثناء إضافة العقار إلى المفضلة')
      });
    }
  }

  get mapUrl(): SafeResourceUrl {
    const location = this.property?.location ?? '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`
    );
  }

  showMessage(type: string): void {
    switch (type) {
      case 'واتس آب':
        this.message = `يمكنك التواصل عبر واتس آب على الرقم 01012345678`;
        break;
      case 'اتصال':
        this.message = `اتصل بنا على الرقم 01012345678`;
        break;
      case 'مشاركة':
        this.message = `تم مشاركة العقار معك`;
        break;
      default:
        this.message = '';
    }
  }
}
