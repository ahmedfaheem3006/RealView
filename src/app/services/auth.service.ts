import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = 'https://gradution-project-silk.vercel.app/users';
  private registerUrl = `${this.apiBaseUrl}/register`;
  private loginUrl = `${this.apiBaseUrl}/signin`;
  private profileUrl = `${this.apiBaseUrl}/me`;

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    // تنسيق البيانات قبل الإرسال
    const formattedData = {
      ...userData,
      age: Number(userData.age)
    };
    
    console.log('تسجيل مستخدم بالبيانات:', formattedData);
    
    return this.http.post(this.registerUrl, formattedData, { headers });
  }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post<any>(this.loginUrl, credentials, { headers }).pipe(
      tap((res) => {
        console.log('استجابة تسجيل الدخول:', res);
        
        // 1. حفظ التوكن
        localStorage.setItem('token', res.token);
        
        // 2. محاولة استخراج البيانات من التوكن
        try {
          const tokenData = this.parseJwt(res.token);
          console.log('بيانات التوكن:', tokenData);
          
          // حفظ البيانات الأساسية من التوكن
          this.saveTokenData(tokenData);
          
          // 3. إذا كانت الاستجابة تحتوي على كائن المستخدم مباشرة
          if (res.user) {
            console.log('بيانات المستخدم من الاستجابة:', res.user);
            this.saveUserData(res.user);
          }
          
          // 4. جلب بيانات المستخدم الكاملة من الخادم إذا كان التوكن متاحًا
          this.fetchAndSaveUserProfile(res.token);
          
          // 5. تحديث حالة تسجيل الدخول
          this.isLoggedInSubject.next(true);
        } catch (error) {
          console.error('خطأ أثناء معالجة بيانات تسجيل الدخول:', error);
          // حتى مع وجود خطأ، نحاول استمرار تسجيل الدخول
          this.isLoggedInSubject.next(true);
        }
      }),
      catchError(error => {
        console.error('خطأ في تسجيل الدخول:', error);
        return throwError(() => error);
      })
    );
  }

  // حفظ بيانات التوكن في localStorage
  private saveTokenData(tokenData: any): void {
    if (!tokenData) return;
    
    // حفظ معرف المستخدم
    if (tokenData.userId) localStorage.setItem('userId', tokenData.userId);
    if (tokenData._id) localStorage.setItem('_id', tokenData._id);
    
    // حفظ الاسم واسم المستخدم
    if (tokenData.username) localStorage.setItem('username', tokenData.username);
    if (tokenData.userName) localStorage.setItem('username', tokenData.userName);
    
    // حفظ البريد الإلكتروني
    if (tokenData.email) localStorage.setItem('email', tokenData.email);
    
    // حفظ الدور/النوع
    if (tokenData.role) localStorage.setItem('userType', tokenData.role);
    if (tokenData.userType) localStorage.setItem('userType', tokenData.userType);
    
    // حفظ التوكن كاملًا كـ JSON
    localStorage.setItem('tokenData', JSON.stringify(tokenData));
  }

  // حفظ بيانات المستخدم من كائن المستخدم
  private saveUserData(userData: any): void {
    if (!userData) return;
    
    // نسخة من البيانات للتعديل
    const userDataToSave = { ...userData };
    
    // حذف كلمة المرور إن وجدت
    if (userDataToSave.password) delete userDataToSave.password;
    
    // حفظ الحقول الفردية
    if (userDataToSave._id) localStorage.setItem('_id', userDataToSave._id);
    if (userDataToSave.username) localStorage.setItem('username', userDataToSave.username);
    if (userDataToSave.nationalId) localStorage.setItem('nationalId', userDataToSave.nationalId);
    if (userDataToSave.email) localStorage.setItem('email', userDataToSave.email);
    if (userDataToSave.userType) localStorage.setItem('userType', userDataToSave.userType);
    if (userDataToSave.age !== undefined) localStorage.setItem('age', userDataToSave.age.toString());
    if (userDataToSave.gender) localStorage.setItem('gender', userDataToSave.gender);
    if (userDataToSave.phone) localStorage.setItem('phone', userDataToSave.phone);
    if (userDataToSave.address) localStorage.setItem('address', userDataToSave.address);
    if (userDataToSave.createdAt) localStorage.setItem('createdAt', userDataToSave.createdAt);
    if (userDataToSave.updatedAt) localStorage.setItem('updatedAt', userDataToSave.updatedAt);
    
    // حفظ الكائن كاملًا
    localStorage.setItem('user', JSON.stringify(userDataToSave));
    
    console.log('تم حفظ بيانات المستخدم في localStorage');
  }

  // جلب ملف تعريف المستخدم من الخادم وحفظه
  private fetchAndSaveUserProfile(token: string): void {
    if (!token) return;
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    // محاولة جلب الملف الشخصي
    this.http.get<any>(this.profileUrl, { headers })
      .subscribe({
        next: (profileData) => {
          console.log('تم جلب بيانات الملف الشخصي من الخادم:', profileData);
          
          // قد تكون البيانات مغلفة في كائن data أو user
          let userData = profileData;
          if (profileData.data) userData = profileData.data;
          if (profileData.user) userData = profileData.user;
          
          // حفظ بيانات الملف الشخصي
          this.saveUserData(userData);
          
          // سجل محتويات localStorage للتحقق
          this.logLocalStorageContents();
        },
        error: (error) => {
          console.error('خطأ في جلب الملف الشخصي:', error);
          
          // إذا فشلت نقطة نهاية /me، نحاول استخدام معرف المستخدم
          this.tryFetchUserById(token);
        }
      });
  }

  // محاولة جلب بيانات المستخدم باستخدام معرف المستخدم
  private tryFetchUserById(token: string): void {
    // الحصول على معرف المستخدم من localStorage
    const userId = localStorage.getItem('userId') || localStorage.getItem('_id');
    
    if (!userId) {
      console.error('لا يمكن العثور على معرف المستخدم لجلب البيانات');
      return;
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http.get<any>(`${this.apiBaseUrl}/${userId}`, { headers })
      .subscribe({
        next: (userData) => {
          console.log('تم جلب بيانات المستخدم باستخدام المعرف:', userData);
          this.saveUserData(userData);
          this.logLocalStorageContents();
        },
        error: (error) => {
          console.error('فشل جلب بيانات المستخدم باستخدام المعرف:', error);
        }
      });
  }

  // تسجيل محتويات localStorage للتحقق
  private logLocalStorageContents(): void {
    console.log('جميع محتويات localStorage بعد تسجيل الدخول:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        // تجنب عرض البيانات الحساسة في التسجيل
        if (key === 'token' || key === 'tokenData') {
          console.log(`${key}: [تم تخزينه]`);
        } else {
          console.log(`${key}: ${localStorage.getItem(key)}`);
        }
      }
    }
  }

  // فك تشفير JWT للحصول على البيانات
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      );
      
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('خطأ في فك تشفير التوكن:', e);
      return {};
    }
  }

  // تحديث معلومات المستخدم من الخادم
  refreshUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return throwError(() => new Error('لا يوجد توكن لتحديث بيانات المستخدم'));
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<any>(this.profileUrl, { headers }).pipe(
      tap(userData => {
        this.saveUserData(userData);
      }),
      catchError(error => {
        console.error('فشل تحديث بيانات المستخدم:', error);
        return throwError(() => error);
      })
    );
  }

  // تسجيل الخروج
  logout() {
    // مسح جميع بيانات localStorage
    localStorage.clear();
    
    // تحديث حالة تسجيل الدخول
    this.isLoggedInSubject.next(false);
  }

  // التحقق من حالة تسجيل الدخول
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  // الحصول على بيانات المستخدم المخزنة
  getUser(): any {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('خطأ في تحليل بيانات المستخدم:', error);
        return null;
      }
    }
    return null;
  }

  // الحصول على قيمة حقل معين من بيانات المستخدم
  getUserField(fieldName: string): string | null {
    // أولاً، محاولة الحصول من localStorage مباشرة
    const directValue = localStorage.getItem(fieldName);
    if (directValue) return directValue;
    
    // إذا لم يوجد، محاولة الحصول من كائن المستخدم المخزن
    const user = this.getUser();
    if (user && user[fieldName]) {
      return user[fieldName].toString();
    }
    
    return null;
  }

  // التحقق مما إذا كان المستخدم له دور معين
  hasRole(role: string): boolean {
    const userType = this.getUserField('userType') || this.getUserField('role');
    return userType === role;
  }

  // الحصول على التوكن
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}