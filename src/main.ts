import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // لو تحتاجه

import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Initialize AOS separately
AOS.init();

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
  ],
}).catch(err => console.error(err));
