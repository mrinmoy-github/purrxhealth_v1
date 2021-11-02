import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillingInfoComponent } from './update-billing-info.component';

describe('UpdateBillingInfoComponent', () => {
  let component: UpdateBillingInfoComponent;
  let fixture: ComponentFixture<UpdateBillingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBillingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
