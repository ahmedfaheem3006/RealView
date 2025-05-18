import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.component.html',
  styleUrls: ['./why-choose-us.component.css']
})
export class WhyChooseUsComponent {
  counters = [
    {
      number: 1200,
      title: 'العملاء',
      description: 'لقد عملنا مع أكثر من 1200 عميل.',
      icon: 'fa-users'
    },
    {
      number: 34,
      title: 'المشاريع',
      description: 'أنجزنا 34 مشروعًا رئيسيًا هذا العام.',
      icon: 'fa-briefcase'
    },
    {
      number: 15,
      title: 'الجوائز',
      description: 'حصلنا على 15 جائزة صناعية.',
      icon: 'fa-trophy'
    },
    {
      number: 9,
      title: 'المكاتب',
      description: 'لدينا 9 مكاتب حول العالم.',
      icon: 'fa-building'
    }
  ];
}
