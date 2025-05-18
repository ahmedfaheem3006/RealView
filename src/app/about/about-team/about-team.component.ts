import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-team',
  imports: [CommonModule],
  templateUrl: './about-team.component.html',
  styleUrl: './about-team.component.css'
})
export class TeamComponent {
  teamMembers = [
    {
      name: 'مريهان وحيد',
      position: 'المديرة التنفيذية، مجموعة مسكن للواجهات',
      role: 'عضو مجلس الإدارة',
      image: 'assets/images/aboutPage/team/merihan.jpg',
      description:
        'مريهان وحيد هي المديرة التنفيذية لمجموعة مسكن للواجهات، تقود حلولاً مبتكرة في الواجهات الأمامية بخبرة عالية في Angular وتصميم واجهات المستخدم.',
    },
    {
      name: 'مريهان وحيد',
      position: 'المديرة التنفيذية، مجموعة مسكن للواجهات',
      role: 'عضو مجلس الإدارة',
      image: 'assets/images/aboutPage/team/merihan.jpg',
      description:
        'مريهان واحد هي المديرة التنفيذية لمجموعة مسكن للواجهات، تقود حلولاً مبتكرة في الواجهات الأمامية بخبرة عالية في Angular وتصميم واجهات المستخدم.',
    },
    {
      name: 'حيدر علي خان',
      position: 'المدير التنفيذي، مجموعة مسكن للواجهات',
      role: 'عضو مجلس الإدارة',
      image: 'assets/images/aboutPage/team/merihan.jpg',
      description:
        'حيدر علي خان هو المدير التنفيذي لمجموعة مسكن للواجهات، يقود تطوير حلول واجهات أمامية مبتكرة بخبرة متميزة في Angular وتجربة المستخدم.',
    },
  ];
}
