import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestSalePropertiesComponent } from './latest-sale-properties.component';

describe('LatestSalePropertiesComponent', () => {
  let component: LatestSalePropertiesComponent;
  let fixture: ComponentFixture<LatestSalePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestSalePropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestSalePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
