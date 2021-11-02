import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountLeftMenuComponent } from './my-account-left-menu.component';

describe('MyAccountLeftMenuComponent', () => {
  let component: MyAccountLeftMenuComponent;
  let fixture: ComponentFixture<MyAccountLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
