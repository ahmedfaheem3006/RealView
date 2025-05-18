import { Component } from '@angular/core';
import { AboutSummaryComponent } from './about-summary/about-summary.component';
import { AboutContactComponent } from './about-contact/about-contact.component';
import { TeamComponent } from "./about-team/about-team.component";
import { AboutBannerComponent } from "./about-banner/about-banner.component";
import { CarouselComponent } from "../components/carousel/carousel.component";
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutSummaryComponent, AboutContactComponent, TeamComponent, CarouselComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent { }
