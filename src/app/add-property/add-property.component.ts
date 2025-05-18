import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {
  propertyForm: FormGroup;
  selectedImages: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      rooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      area: ['', Validators.required],
      status: ['Available', Validators.required],
      purpose: ['Sale', Validators.required],
      availabFrom: ['', Validators.required],
      mapLink: ['']
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files);
      this.previewImages(this.selectedImages);
    }
  }

  previewImages(files: File[]) {
    this.imagePreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  submitForm() {
    if (this.propertyForm.invalid) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    const formData = new FormData();
    const values = this.propertyForm.value;

    formData.append('title', values.title);
    formData.append('location', values.location);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('rooms', values.rooms);
    formData.append('bathrooms', values.bathrooms);
    formData.append('area', values.area);
    formData.append('status', values.status);
    formData.append('purpose', values.purpose);
    formData.append('availabFrom', values.availabFrom);

    this.selectedImages.forEach((file) => {
      formData.append('images', file);
    });

    const headers = {
      token: `ahmedEhab ${localStorage.getItem('token')}`
    }

    this.http.post(
      'https://gradution-project-silk.vercel.app/properties/add?categoryId=67e45d9b6b1d08da665bce55&subCategoryId=67e45e4a6b1d08da665bce66',
      formData,
      { headers }
    ).subscribe({
      next: () => {

        this.router.navigate(['/success']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ فشل في الإضافة: ' + err.message);
      }
    });
  }
}
