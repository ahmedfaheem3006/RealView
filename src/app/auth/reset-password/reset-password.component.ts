import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private router: Router) {}

  saveNewPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'كلمتا المرور غير متطابقتين.';
      return;
    }

    localStorage.setItem('adminPassword', this.newPassword);
    this.message = 'تم تعيين كلمة المرور الجديدة بنجاح.';
    setTimeout(() => this.router.navigate(['/auth/login']), 3000);
  }
}
