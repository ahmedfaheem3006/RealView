import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  user: any = null;
  properties: any[] = [];

  constructor(
    private userService: UserService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserProperties();
  }

  loadUserData(): void {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => {
        this.user = res.data; // ✅ التصحيح
        console.log('User:', res.data);
      },
      error: err => {
        console.error('Error loading user data', err);
      }
    });
  }

  loadUserProperties(): void {
    this.propertyService.getProperties().subscribe({
      next: (res: any) => {
        this.properties = res.data; // ✅ التصحيح
        console.log('Properties:', res.data);
      },
      error: err => {
        console.error('Error loading properties', err);
      }
    });
  }

  deleteProperty(id: string): void {
    if (confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      this.propertyService.deleteProperty(id).subscribe({
        next: () => {
          this.properties = this.properties.filter(p => p._id !== id);
        },
        error: err => {
          console.error('Error deleting property', err);
        }
      });
    }
  }
}
