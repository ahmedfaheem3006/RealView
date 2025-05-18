import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  apiUrl = 'https://gradution-project-silk.vercel.app/users';
  userId = '';
  userData: any = {};
  token = '';
  loadingData = true;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // إنشاء النموذج
    this.initForm();
    
    // استدعاء بيانات المستخدم من localStorage وإعداد النموذج
    this.loadUserDataFromLocalStorage();
    
    // إذا لم تكن البيانات كاملة في localStorage، حاول جلبها من الخادم
    if (!this.userData.phone || !this.userData.nationalId) {
      this.loadUserDataFromServer();
    } else {
      this.loadingData = false;
    }
  }

  // إنشاء نموذج البيانات
  initForm(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      nationalId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      userType: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // جلب بيانات المستخدم من localStorage
  loadUserDataFromLocalStorage(): void {
    this.token = localStorage.getItem('token') || '';
    
    // محاولة استخراج بيانات المستخدم من تخزين البيانات المحلي
    try {
      // 1. محاولة الحصول من كائن user المخزن
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const parsedUser = JSON.parse(userStr);
        this.userData = { ...this.userData, ...parsedUser };
        this.userId = parsedUser.userId || '';
      }
      
      // 2. محاولة الحصول من عناصر منفصلة في localStorage
      const fields = [
        'username', 'email', 'userType', 'address', 'phone', 
        'gender', 'age', 'nationalId', 'role'
      ];
      
      fields.forEach(field => {
        const value = localStorage.getItem(field);
        if (value) {
          this.userData[field] = value;
        }
      });
      
      // 3. تحويل userName إلى username إذا لزم الأمر
      if (this.userData.userName && !this.userData.username) {
        this.userData.username = this.userData.userName;
      }
      
      // 4. تحويل role إلى userType إذا لزم الأمر
      if (this.userData.role && !this.userData.userType) {
        this.userData.userType = this.userData.role;
      }
      
      // تحديث النموذج بالبيانات المتوفرة
      this.updateFormWithUserData();
      
    } catch (error) {
      console.error('خطأ في جلب بيانات المستخدم من التخزين المحلي:', error);
    }
  }

  // تحديث النموذج بالبيانات المستخرجة
  updateFormWithUserData(): void {
    if (this.userData) {
      this.profileForm.patchValue({
        username: this.userData.username || this.userData.userName || '',
        email: this.userData.email || '',
        userType: this.userData.userType || this.userData.role || '',
        address: this.userData.address || '',
        phone: this.userData.phone || '',
        gender: this.userData.gender || '',
        age: this.userData.age || '',
        nationalId: this.userData.nationalId || ''
      });
    }
  }

  // جلب بيانات المستخدم من الخادم
  loadUserDataFromServer(): void {
    if (!this.userId || !this.token) {
      this.errorMessage = 'لا يمكن جلب بيانات المستخدم. الرجاء تسجيل الدخول مرة أخرى.';
      this.loadingData = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get(`${this.apiUrl}/me`, { headers }).subscribe({
      next: (data: any) => {
        this.userData = { ...this.userData, ...data };
        this.updateFormWithUserData();
        this.loadingData = false;
      },
      error: (err) => {
        console.error('خطأ في جلب بيانات المستخدم من الخادم:', err);
        this.errorMessage = 'حدث خطأ أثناء جلب البيانات من الخادم.';
        this.loadingData = false;
      }
    });
  }

  // تقديم النموذج لتحديث البيانات
  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    // نسخة من البيانات للإرسال
    const formData = { ...this.profileForm.value };
    
    // إزالة حقل كلمة المرور إذا كان فارغًا
    if (!formData.password) {
      delete formData.password;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.put(`${this.apiUrl}/update`, formData, { headers }).subscribe({
      next: (res) => {
        this.successMessage = 'تم تحديث البيانات بنجاح';
        
        // تحديث البيانات في localStorage
        this.updateLocalStorage(formData);
        
        // إخفاء رسالة النجاح بعد 3 ثوان
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('خطأ في تحديث البيانات:', err);
        this.errorMessage = err.error?.message || 'حدث خطأ أثناء تحديث البيانات';
        
        // إخفاء رسالة الخطأ بعد 3 ثوان
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  // تحديث البيانات في localStorage بعد التعديل الناجح
  updateLocalStorage(formData: any): void {
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        localStorage.setItem(key, formData[key]);
      }
    });
    
    // تحديث كائن user
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const updatedUser = { ...user };
        
        // تحديث الحقول
        if (formData.username) updatedUser.username = formData.username;
        if (formData.email) updatedUser.email = formData.email;
        if (formData.userType) updatedUser.userType = formData.userType;
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('خطأ في تحديث بيانات المستخدم في التخزين المحلي:', error);
    }
  }

  // تحديد جميع حقول النموذج كـ "touched" لإظهار رسائل التحقق
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}