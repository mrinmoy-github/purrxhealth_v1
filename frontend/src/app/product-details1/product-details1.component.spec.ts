import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetails1Component } from './product-details1.component';

describe('ProductDetails1Component', () => {
  let component: ProductDetails1Component;
  let fixture: ComponentFixture<ProductDetails1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetails1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetails1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
