import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceGuideComponent } from './price-guide.component';

describe('PriceGuideComponent', () => {
  let component: PriceGuideComponent;
  let fixture: ComponentFixture<PriceGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
