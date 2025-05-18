import { Component, AfterViewInit,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var $: any; // To allow the use of jQuery

@Component({
  selector: 'app-carousel',
  imports: [RouterModule,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images: string[] = [
    'assets/images/carousal/1.jpg',
    'assets/images/carousal/2.jpg',
    'assets/images/carousal/3.jpg'
  ];
  
  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // كل 5 ثواني تبدل الصورة
  }
}
