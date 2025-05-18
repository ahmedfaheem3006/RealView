import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      nationalId: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      userType: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.checkFormValidation();
      return;
    }

    this.loading = true;
    
    // تنسيق البيانات قبل الإرسال للتأكد من تطابقها مع متطلبات الباك إند
    const formattedData = {
      ...this.registerForm.value,
      age: Number(this.registerForm.value.age)
    };
    
    console.log('بيانات التسجيل المرسلة:', formattedData);
    
    this.authService.register(formattedData).subscribe({
      next: (response) => {
        console.log('تم التسجيل بنجاح', response);
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: (error) => {
        console.error('فشل التسجيل', error);
        
        if (error.status === 500) {
          this.errorMessage = 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا أو التواصل مع الدعم الفني.';
        } else if (error.error && typeof error.error === 'object' && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (typeof error.error === 'string') {
          try {
            const parsedError = JSON.parse(error.error);
            this.errorMessage = parsedError.message || 'فشل التسجيل. يرجى التحقق من البيانات والمحاولة مرة أخرى.';
          } catch {
            this.errorMessage = 'فشل التسجيل. يرجى التحقق من البيانات والمحاولة مرة أخرى.';
          }
        } else {
          this.errorMessage = 'فشل التسجيل. يرجى التحقق من البيانات والمحاولة مرة أخرى.';
        }
        
        this.loading = false;
      }
    });
  }

  // التحقق من صحة النموذج وطباعة أي أخطاء للمساعدة في التصحيح
  checkFormValidation() {
    const formControls = this.registerForm.controls;
    Object.keys(formControls).forEach(key => {
      const control = formControls[key as keyof typeof formControls];
      if (control.invalid) {
        console.log(`الحقل ${key} غير صالح. الأخطاء:`, control.errors);
      }
    });
  }

  // طريقة مساعدة للوصول إلى حقول النموذج
  get f() {
    return this.registerForm.controls;
  }
}