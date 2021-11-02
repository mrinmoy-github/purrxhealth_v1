import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessContentsComponent } from './access-contents.component';

describe('AccessContentsComponent', () => {
  let component: AccessContentsComponent;
  let fixture: ComponentFixture<AccessContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
