import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    // بيانات دخول ثابتة كمثال
    if (this.username === 'admin' && this.password === '123456') {
      // تخزين التوكن البسيط
      localStorage.setItem('adminToken', 'loggedIn');

      // توجيه إلى لوحة تحكم الأدمن
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.errorMessage = 'بيانات الدخول غير صحيحة';
    }
  }
}
