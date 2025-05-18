import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSuccessComponent } from './confirm-success.component';

describe('ConfirmSuccessComponent', () => {
  let component: ConfirmSuccessComponent;
  let fixture: ComponentFixture<ConfirmSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
