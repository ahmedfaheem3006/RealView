import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';
import { PropertyMapComponent } from "../../components/property-map/property-map.component";
import { FeaturedPropertiesComponent } from "../../components/featured-properties/featured-properties.component";
import { PropertyCategoriesComponent } from "../../components/property-categories/property-categories.component";
import { WhyChooseUsComponent } from "../../components/why-choose-us/why-choose-us.component";
import { CtaButtonComponent } from "../../components/cta-button/cta-button.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { LatestPropertiesComponent } from "../../components/latest-properties/latest-properties.component";
import { HomeAboutComponent } from "../../components/home-about/home-about.component";

// استيراد المكونات

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    WhyChooseUsComponent,
    CtaButtonComponent,
    CarouselComponent,
    ContactFormComponent,
    LatestPropertiesComponent,
    HomeAboutComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  searchQuery: string = '';

  // كل العقارات
  properties = [
    {
      title: 'فيلا فاخرة',
      price: 500000,
      category: 'فلل',
      image: 'assets/villa.jpg',
      lat: 30.0444,
      lng: 31.2357
    },
    {
      title: 'شقة حديثة',
      price: 150000,
      category: 'شقق',
      image: 'assets/apartment.jpg',
      lat: 30.0500,
      lng: 31.2400
    },
    {
      title: 'مساحة مكتبية',
      price: 300000,
      category: 'مكاتب تجارية',
      image: 'assets/office.jpg',
      lat: 30.0600,
      lng: 31.2300
    }
  ];

  // هذه المتغيرات التي ستتغير عند البحث أو التصنيف
  filteredProperties = [...this.properties];

  categories = ['شقق', 'فلل', 'أراضٍ', 'مكاتب تجارية'];

  ngAfterViewInit(): void {
    // الخرائط تشتغل من خلال المكون المنفصل PropertyMapComponent
    // هنا فقط احتفظنا بـ AfterViewInit لو تحتاجه لاحقًا
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filteredProperties = this.properties.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  onCategorySelected(category: string) {
    this.filteredProperties = this.properties.filter(
      property => property.category === category
    );
  }
}
