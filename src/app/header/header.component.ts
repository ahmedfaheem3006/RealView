import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  username: string = '';
  showDropdown = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // الاستماع لتغييرات حالة تسجيل الدخول
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      
      if (status) {
        this.updateUsername();
      }
    });
    
    // تحقق من حالة تسجيل الدخول عند بدء التشغيل
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.updateUsername();
    }
  }

  // دالة مساعدة لتحديث اسم المستخدم من مصادر متعددة
  updateUsername() {
    // محاولة الحصول على اسم المستخدم مباشرة من localStorage
    const usernameFromLS = localStorage.getItem('username');
    
    if (usernameFromLS) {
      this.username = usernameFromLS;
      return;
    }
    
    // محاولة الحصول على اسم المستخدم من كائن المستخدم المخزن
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        if (user.username) {
          this.username = user.username;
          return;
        }
      }
    } catch (e) {
      console.error('خطأ في قراءة بيانات المستخدم:', e);
    }
    
    // محاولة الحصول على اسم المستخدم من خلال خدمة المصادقة
    const user = this.authService.getUser();
    if (user && user.userName) {
      this.username = user.userName;
      return;
    }
    
    // قيمة افتراضية إذا لم يتم العثور على اسم المستخدم
    this.username = 'المستخدم';
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.authService.logout();
    this.showDropdown = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-container')) {
      this.showDropdown = false;
    }
  }
}