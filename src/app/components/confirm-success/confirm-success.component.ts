import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-success',
  templateUrl: './confirm-success.component.html',
  styleUrls: ['./confirm-success.component.css']
})
export class ConfirmSuccessComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']); // ← يوجه المستخدم للصفحة الرئيسية
  }
}
