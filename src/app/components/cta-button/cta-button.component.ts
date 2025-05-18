import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.css']
})
export class CtaButtonComponent {
  constructor(private router: Router) {}

  navigateToAddProperty() {
    this.router.navigate(['/add-property']); // مسار صفحة إضافة عقار
  }
}
