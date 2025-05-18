import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-management.component.html',
  styleUrls: ['./posts-management.component.css']
})
export class PostsManagementComponent {
  posts = [
    { id: 1, title: 'شقة للبيع في التجمع', type: 'بيع', status: 'منشور', publishDate: '2024-12-01' },
    { id: 2, title: 'فيلا للإيجار في الشيخ زايد', type: 'إيجار', status: 'مسودة', publishDate: '2025-01-10' },
    { id: 3, title: 'استوديو بوسط البلد', type: 'إيجار', status: 'منشور', publishDate: '2025-03-05' }
  ];

  editPost(id: number) {
    console.log(`تعديل المنشور ID: ${id}`);
  }

  deletePost(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}
