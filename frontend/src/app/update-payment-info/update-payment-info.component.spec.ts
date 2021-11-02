import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentInfoComponent } from './update-payment-info.component';

describe('UpdatePaymentInfoComponent', () => {
  let component: UpdatePaymentInfoComponent;
  let fixture: ComponentFixture<UpdatePaymentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePaymentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
