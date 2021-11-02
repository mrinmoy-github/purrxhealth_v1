import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityModifierComponent } from './quantity-modifier.component';

describe('QuantityModifierComponent', () => {
  let component: QuantityModifierComponent;
  let fixture: ComponentFixture<QuantityModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
