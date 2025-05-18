import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  fakeAdminEmail = 'admin@example.com';

  constructor(private router: Router) {}

  resetPassword() {
    if (this.email !== this.fakeAdminEmail) {
      this.message = 'البريد الإلكتروني غير صحيح أو غير مسجل.';
      return;
    }

    this.message = 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني (وهمياً 😊).';
    // توجيه اختياري بعد 3 ثواني
    setTimeout(() => {
      this.router.navigate(['/auth/reset-password']);
    }, 3000);
  }
}
