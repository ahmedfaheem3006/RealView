import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent {
  users = [
    { id: 1, name: 'أحمد علي', email: 'ahmed@example.com', role: 'مشرف' },
    { id: 2, name: 'منى حسن', email: 'mona@example.com', role: 'مستخدم' },
    { id: 3, name: 'محمد فوزي', email: 'mohamed@example.com', role: 'محرر' }
  ];

  editUser(id: number) {
    console.log(`تعديل المستخدم ID: ${id}`);
    // هنا تقدر تضيف التنقل لصفحة التعديل أو مودال
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }
}
