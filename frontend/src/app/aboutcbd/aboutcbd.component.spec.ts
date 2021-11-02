import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutcbdComponent } from './aboutcbd.component';

describe('AboutcbdComponent', () => {
  let component: AboutcbdComponent;
  let fixture: ComponentFixture<AboutcbdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutcbdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutcbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
