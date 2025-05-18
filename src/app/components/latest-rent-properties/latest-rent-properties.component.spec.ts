import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestRentPropertiesComponent } from './latest-rent-properties.component';

describe('LatestRentPropertiesComponent', () => {
  let component: LatestRentPropertiesComponent;
  let fixture: ComponentFixture<LatestRentPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestRentPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestRentPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
