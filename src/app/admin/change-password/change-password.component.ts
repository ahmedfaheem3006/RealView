import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  storedPassword: string = '123456'; // كلمة المرور الحالية (تُخزن مؤقتًا محليًا)

  constructor(private router: Router) {}

  changePassword() {
    const saved = localStorage.getItem('adminPassword') || this.storedPassword;

    if (this.currentPassword !== saved) {
      this.message = 'كلمة المرور الحالية غير صحيحة';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = 'كلمة المرور الجديدة غير متطابقة';
      return;
    }

    localStorage.setItem('adminPassword', this.newPassword);
    this.message = 'تم تغيير كلمة المرور بنجاح';
    setTimeout(() => this.router.navigate(['/admin']), 2000);
  }
}
