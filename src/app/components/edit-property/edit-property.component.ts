import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  propertyForm: FormGroup;
  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  propertyId!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id')!;
    this.loadPropertyData();
  }

  loadPropertyData() {
    this.http.get<any>(`https://your-api.com/properties/${this.propertyId}`).subscribe(data => {
      this.propertyForm.patchValue(data);
      this.imagePreviews = data.images || []; // assuming images are URLs
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

    for (const key in values) {
      formData.append(key, values[key]);
    }

    this.selectedImages.forEach(file => {
      formData.append('images', file);
    });

    const headers = new HttpHeaders({
      token: 'ahmedEhab eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // <-- ضع التوكن الصحيح
    });

    this.http.put(
      `https://your-api.com/properties/update/${this.propertyId}`,
      formData,
      { headers }
    ).subscribe({
      next: () => {
        alert('✅ تم تحديث الإعلان بنجاح');
        this.router.navigate(['/success-edit']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ فشل التحديث: ' + err.message);
      }
    });
  }
}
