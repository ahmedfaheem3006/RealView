import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;
  apiBaseUrl = 'https://gradution-project-silk.vercel.app/users';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // تحقق من وجود التوكن
    const token = localStorage.getItem('token');
    if (token) {
      // إذا كان موجود، وجّه المستخدم مباشرة للصفحة الرئيسية
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
  if (!this.email || !this.password) {
    this.errorMessage = 'يرجى إدخال البريد الإلكتروني وكلمة المرور';
    return;
  }
  
  this.loading = true;
  this.errorMessage = '';
  
  const body = {
    email: this.email,
    password: this.password
  };

  this.http.post<any>(`${this.apiBaseUrl}/signin`, body)
    .subscribe({
      next: (res) => {
        console.log('استجابة تسجيل الدخول:', res);
        
        // 1. حفظ التوكن
        const token = res.token;
        localStorage.setItem('token', token);
        
        // 2. محاولة استخراج البيانات من tokenData
        try {
          const tokenData = this.parseJwt(token);
          console.log('بيانات التوكن:', tokenData);
          
          // إذا كان هناك معرف للمستخدم، حفظه
          if (tokenData.userId) {
            localStorage.setItem('userId', tokenData.userId);
          } else if (tokenData._id) {
            localStorage.setItem('userId', tokenData._id);
          }
          
          // حفظ اسم المستخدم إن وجد
          if (tokenData.userName) {
            localStorage.setItem('username', tokenData.userName);
          } else if (tokenData.username) {
            localStorage.setItem('username', tokenData.username);
          }
          
          // حفظ البريد الإلكتروني
          if (tokenData.email) {
            localStorage.setItem('email', tokenData.email);
          }
          
          // حفظ الدور/النوع
          if (tokenData.role) {
            localStorage.setItem('userType', tokenData.role);
          } else if (tokenData.userType) {
            localStorage.setItem('userType', tokenData.userType);
          }
          
          // 3. محاولة استخراج بيانات من user في الاستجابة
          if (res.user) {
            const user = res.user;
            console.log('بيانات المستخدم من الاستجابة:', user);
            
            // حفظ كل الحقول المتوفرة
            if (user._id) localStorage.setItem('_id', user._id);
            if (user.username) localStorage.setItem('username', user.username);
            if (user.nationalId) localStorage.setItem('nationalId', user.nationalId);
            if (user.email) localStorage.setItem('email', user.email);
            if (user.userType) localStorage.setItem('userType', user.userType);
            if (user.age) localStorage.setItem('age', user.age.toString());
            if (user.gender) localStorage.setItem('gender', user.gender);
            if (user.phone) localStorage.setItem('phone', user.phone);
            if (user.address) localStorage.setItem('address', user.address);
            
            // حفظ الكائن كاملاً بدون كلمة المرور
            const userToSave = { ...user };
            if (userToSave.password) {
              delete userToSave.password;
            }
            localStorage.setItem('user', JSON.stringify(userToSave));
          }
          
          // 4. سجل جميع محتويات localStorage للتحقق
          console.log('جميع محتويات localStorage بعد التسجيل:');
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
              console.log(`${key}: ${localStorage.getItem(key)}`);
            }
          }
          
          // 5. إكمال تسجيل الدخول
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
          
        } catch (error) {
          console.error('خطأ أثناء معالجة بيانات تسجيل الدخول:', error);
          // حتى مع وجود خطأ، نحاول إكمال تسجيل الدخول
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }
      },
      error: (err) => {
        console.error('خطأ في تسجيل الدخول:', err);
        
        if (err.status === 404) {
          this.errorMessage = 'بيانات الدخول غير صحيحة. الرجاء المحاولة مجددًا.';
        } else {
          this.errorMessage = 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.';
        }
        
        this.loading = false;
      }
    });
}
  
  // جلب كامل بيانات المستخدم من الخادم
  private fetchCompleteUserData(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http.get<any>(`${this.apiBaseUrl}/me`, { headers })
      .subscribe({
        next: (userData) => {
          console.log('تم جلب بيانات المستخدم الكاملة:', userData);
          
          // حفظ كامل بيانات المستخدم باستثناء كلمة المرور
          this.saveCompleteUserData(userData);
          
          // توجيه المستخدم للصفحة الرئيسية وإعادة تحميل الصفحة
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error('خطأ في جلب بيانات المستخدم الكاملة:', err);
          
          // إذا فشلت عملية جلب البيانات الكاملة، استخدم البيانات الأساسية من التوكن
          // ومع ذلك، استمر في توجيه المستخدم للصفحة الرئيسية
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
  
  // حفظ بيانات التوكن الأساسية
  private saveTokenData(tokenData: any) {
    // حفظ البيانات الأساسية من التوكن
    if (tokenData.userName) localStorage.setItem('username', tokenData.userName);
    if (tokenData.email) localStorage.setItem('email', tokenData.email);
    if (tokenData.role) localStorage.setItem('userType', tokenData.role);
    if (tokenData.userId) localStorage.setItem('userId', tokenData.userId);
    
    // حفظ كائن التوكن كاملًا (للاحتياط)
    localStorage.setItem('tokenData', JSON.stringify(tokenData));
  }
  
  // حفظ كامل بيانات المستخدم باستثناء كلمة المرور
  private saveCompleteUserData(userData: any) {
    // نسخة من بيانات المستخدم لتعديلها
    const userDataToSave = { ...userData };
    
    // حذف كلمة المرور لأسباب أمنية
    if (userDataToSave.password) {
      delete userDataToSave.password;
    }
    
    // حفظ الحقول المنفصلة للوصول السهل
    if (userDataToSave._id) localStorage.setItem('_id', userDataToSave._id);
    if (userDataToSave.username) localStorage.setItem('username', userDataToSave.username);
    if (userDataToSave.nationalId) localStorage.setItem('nationalId', userDataToSave.nationalId);
    if (userDataToSave.email) localStorage.setItem('email', userDataToSave.email);
    if (userDataToSave.userType) localStorage.setItem('userType', userDataToSave.userType);
    if (userDataToSave.age) localStorage.setItem('age', userDataToSave.age.toString());
    if (userDataToSave.gender) localStorage.setItem('gender', userDataToSave.gender);
    if (userDataToSave.phone) localStorage.setItem('phone', userDataToSave.phone);
    if (userDataToSave.address) localStorage.setItem('address', userDataToSave.address);
    
    // حفظ كائن المستخدم كاملًا (بدون كلمة المرور)
    localStorage.setItem('user', JSON.stringify(userDataToSave));
  }
  
  // دالة لفك تشفير JWT للحصول على البيانات
  private parseJwt(token: string): any {
    try {
      // قسم التوكن JWT إلى أجزاء
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      // فك تشفير الجزء الثاني من التوكن (payload)
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('خطأ في فك تشفير التوكن:', e);
      return {};
    }
  }
}