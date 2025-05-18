import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-price-guide',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './price-guide.component.html',
  styleUrls: ['./price-guide.component.css'],
})
export class PriceGuideComponent implements OnInit {
  private http = inject(HttpClient);

  private readonly BASE_URL = 'https://gradution-project-silk.vercel.app/api';

  purpose: 'rent' | 'sale' = 'rent';
  selectedArea: string = 'القاهرة'; // نبدأ بمنطقة افتراضية
  areas: string[] = ['القاهرة', 'الجيزة', 'الإسكندرية'];

  chartType: ChartType = 'bar';
  chartData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration['options'] = { responsive: true };

  relatedProperties: any[] = [];

  ngOnInit() {
    this.loadChart();
    this.loadRelatedProperties();
  }

  loadChart() {
    // بيانات وهمية لاختبار الرسم البياني
    const mockData = [
      { zone: 'مدينة نصر', rent: 4000, sale: 800000 },
      { zone: 'المعادي', rent: 6000, sale: 1200000 },
      { zone: 'الزمالك', rent: 10000, sale: 2500000 },
    ];

    this.chartData = {
      labels: mockData.map(z => z.zone),
      datasets: [
        {
          data: mockData.map(z => this.purpose === 'rent' ? z.rent : z.sale),
          label: this.purpose === 'rent' ? 'الإيجار' : 'البيع',
          backgroundColor: '#2e7d32',
        }
      ]
    };
  }

  switchPurpose(purpose: 'rent' | 'sale') {
    this.purpose = purpose;
    this.loadChart();
  }

  loadRelatedProperties() {
    // بيانات وهمية لاختبار العقارات
    this.relatedProperties = [
      { title: 'شقة 120م في المعادي', price: 5000 },
      { title: 'فيلا 300م في التجمع', price: 18000 },
      { title: 'استوديو مفروش في الزمالك', price: 9000 },
    ];
  }
}
