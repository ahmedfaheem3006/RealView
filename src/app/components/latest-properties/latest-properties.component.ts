import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-latest-properties',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, HttpClientModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="section-title">عقارات للبيع</h2>

      <ngx-slick-carousel class="carousel" [config]="slideConfig">
        <div ngxSlickItem *ngFor="let property of saleProperties" class="slide">
          <div class="property-card">
            <div class="card-image">
              <img [src]="property.imageUrl" alt="صورة العقار" />
              <button 
                class="favorite-btn" 
                [class.active]="property.isFavorite" 
                (click)="toggleFavorite(property)">
                ♥
              </button>
            </div>

            <div class="card-body">
              <h3 class="card-title">{{ property.title }}</h3>
              <p class="card-description">{{ property.description }}</p>

              <div class="property-info">
                <span>غرف: {{ property.rooms }}</span>
                <span>حمام: {{ property.bathrooms }}</span>
                <span>المساحة: {{ property.area }} م²</span>
              </div>

              <div class="card-footer">
                <span class="price">{{ property.price }} جنيه</span>
                <button [routerLink]="['/property', property.id]" class="details-btn">اعرض التفاصيل</button>
              </div>
            </div>
          </div>
        </div>
      </ngx-slick-carousel>

      <h2 class="section-title">عقارات للإيجار</h2>

      <ngx-slick-carousel class="carousel" [config]="slideConfig">
        <div ngxSlickItem *ngFor="let property of rentProperties" class="slide">
          <div class="property-card">
            <div class="card-image">
              <img [src]="property.imageUrl" alt="صورة العقار" />
              <button 
                class="favorite-btn" 
                [class.active]="property.isFavorite" 
                (click)="toggleFavorite(property)">
                ♥
              </button>
            </div>

            <div class="card-body">
              <h3 class="card-title">{{ property.title }}</h3>
              <p class="card-description">{{ property.description }}</p>

              <div class="property-info">
                <span>غرف: {{ property.rooms }}</span>
                <span>حمام: {{ property.bathrooms }}</span>
                <span>المساحة: {{ property.area }} م²</span>
              </div>

              <div class="card-footer">
                <span class="price">{{ property.price }} جنيه/شهرياً</span>
                <button [routerLink]="['/property', property.id]" class="details-btn">اعرض التفاصيل</button>
              </div>
            </div>
          </div>
        </div>
      </ngx-slick-carousel>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .container h2 { text-align:center; color: #d2691e; margin: 2rem; padding: 1rem; }
    .section-title { text-align: start; font-size: 2rem; font-weight: bold; margin: 2rem 0 1rem; }
    .carousel { margin-bottom: 3rem; }
    .slide { padding: 1rem; }
    .property-card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative; transition: transform 0.3s; }
    .property-card:hover { transform: translateY(-5px); }
    .card-image { position: relative; }
    .card-image img { width: 100%; height: 200px; object-fit: cover; }
    .favorite-btn { position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; padding: 8px; font-size: 1.5rem; cursor: pointer; color: #e53e3e; transition: all 0.3s ease; }
    .favorite-btn.active { background: #e53e3e; color: white; animation: pop 0.3s ease; }
    @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }
    .card-body { padding: 1rem; }
    .card-title { font-size: 1.2rem; font-weight: bold; margin-bottom: 0.5rem; }
    .card-description { font-size: 0.9rem; color: #666; margin-bottom: 1rem; }
    .property-info { display: flex; justify-content: space-between; font-size: 0.85rem; color: #555; margin-bottom: 1rem; }
    .card-footer { display: flex; justify-content: space-between; align-items: center; }
    .price { color: #16a34a; font-weight: bold; }
    .details-btn { background-color: #16a34a; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; transition: background 0.3s; }
    .details-btn:hover { background-color: #15803d; }
  `]
})
export class LatestPropertiesComponent implements OnInit {
  saleProperties: any[] = [];
  rentProperties: any[] = [];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    rtl: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 }},
      { breakpoint: 768, settings: { slidesToShow: 2 }},
      { breakpoint: 480, settings: { slidesToShow: 1 }}
    ]
  };

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.saleProperties = [
      {
        id: 1,
        title: 'شقة فاخرة للبيع',
        description: 'شقة ٣ غرف مساحة رائعة',
        imageUrl: 'https://via.placeholder.com/400x200',
        rooms: 3,
        bathrooms: 2,
        area: 130,
        price: 950000,
        isFavorite: false
      },
      {
        id: 2,
        title: 'فيلا مستقلة للبيع',
        description: 'فيلا بتصميم عصري وحديقة',
        imageUrl: './assets/images/property/images (1).jpg',
        rooms: 5,
        bathrooms: 4,
        area: 450,
        price: 3500000,
        isFavorite: false
      },
      {
        id: 3,
        title: 'دوبلكس راقي للبيع',
        description: 'دوبلكس ٤ غرف تشطيب سوبر لوكس',
        imageUrl: './assets/images/property/sale1.jpg',
        rooms: 4,
        bathrooms: 3,
        area: 300,
        price: 2200000,
        isFavorite: false
      },
      {
        id: 4,
        title: 'شقة متشطبة للبيع',
        description: 'تشطيب كامل بالقرب من المترو',
        imageUrl: './assets/images/property/sale2.jpg',
        rooms: 2,
        bathrooms: 1,
        area: 100,
        price: 750000,
        isFavorite: false
      },
      {
        id: 5,
        title: 'شقة فاخرة بالتجمع',
        description: 'موقع ممتاز وتشطيب هاي لوكس',
        imageUrl: './assets/images/property/sale3.jpg',
        rooms: 3,
        bathrooms: 2,
        area: 140,
        price: 1250000,
        isFavorite: false
      }
    ];

    this.rentProperties = [
      {
        id: 10,
        title: 'شقة للإيجار بالتجمع',
        description: 'موقع مميز بالقرب من الخدمات',
        imageUrl: './assets/images/property/images (2).jpg',
        rooms: 3,
        bathrooms: 2,
        area: 120,
        price: 7000,
        isFavorite: false
      },
      {
        id: 11,
        title: 'ستوديو مفروش للإيجار',
        description: 'تشطيب فاخر وجاهز للسكن',
        imageUrl: './assets/images/property/images.jpg',
        rooms: 1,
        bathrooms: 1,
        area: 50,
        price: 4000,
        isFavorite: false
      },
      {
        id: 12,
        title: 'شقة عائلية للإيجار',
        description: '3 غرف وصالة قريبة من الخدمات',
        imageUrl: './assets/images/property/rent1.jpg',
        rooms: 3,
        bathrooms: 2,
        area: 130,
        price: 6000,
        isFavorite: false
      },
      {
        id: 13,
        title: 'شقة مفروشة للإيجار الشهري',
        description: 'تشطيب ممتاز في حي راقٍ',
        imageUrl: './assets/images/property/rent2.jpg',
        rooms: 2,
        bathrooms: 1,
        area: 90,
        price: 5500,
        isFavorite: false
      },
      {
        id: 14,
        title: 'شقة صغيرة للإيجار',
        description: 'غرفة واحدة وسعر مناسب',
        imageUrl: './assets/images/property/rent3.jpg',
        rooms: 1,
        bathrooms: 1,
        area: 60,
        price: 3000,
        isFavorite: false
      }
    ];
  }

  toggleFavorite(property: any) {
    property.isFavorite = !property.isFavorite;
  }
}
