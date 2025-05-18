import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  name = '';
  email = '';
  phone = '';
  message = '';

  submitForm() {
    console.log('Form submitted:', { name: this.name, email: this.email, phone: this.phone, message: this.message });
  }
}
