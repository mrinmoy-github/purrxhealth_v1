import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShippingInfoComponent } from './update-shipping-info.component';

describe('UpdateShippingInfoComponent', () => {
  let component: UpdateShippingInfoComponent;
  let fixture: ComponentFixture<UpdateShippingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateShippingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateShippingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
