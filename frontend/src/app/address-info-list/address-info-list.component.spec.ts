import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfoListComponent } from './address-info-list.component';

describe('AddressInfoListComponent', () => {
  let component: AddressInfoListComponent;
  let fixture: ComponentFixture<AddressInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
