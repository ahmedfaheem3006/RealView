// map-view.component.ts
import { Component, Input, AfterViewInit } from '@angular/core';
declare let L: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './mapview.component.html'
})
export class MapViewComponent implements AfterViewInit {
  @Input() properties: any[] = [];
  
  ngAfterViewInit() {
    const map = L.map('map').setView([30.0444, 31.2357], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    this.properties.forEach(property => {
      L.marker([property.latitude, property.longitude]).addTo(map)
        .bindPopup(`<b>${property.title}</b><br>Price: $${property.price}`);
    });
  }
}
