import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLeftSideBarComponent } from './product-left-side-bar.component';

describe('ProductLeftSideBarComponent', () => {
  let component: ProductLeftSideBarComponent;
  let fixture: ComponentFixture<ProductLeftSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLeftSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
