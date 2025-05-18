import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-property-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.css']
})
export class PropertyMapComponent implements AfterViewInit, OnChanges {
  @Input() properties: any[] = [];
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && changes['properties']) {
      this.addMarkers();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([30.0444, 31.2357], 10); // Default: Cairo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    if (!this.map) return;
    this.map.eachLayer(layer => {
      if ((layer as any)._latlng) {
        this.map.removeLayer(layer);
      }
    });

    this.properties.forEach(prop => {
      if (prop.lat && prop.lng) {
        L.marker([prop.lat, prop.lng])
          .addTo(this.map)
          .bindPopup(`<b>${prop.title}</b><br>Price: $${prop.price}`);
      }
    });
  }
}
