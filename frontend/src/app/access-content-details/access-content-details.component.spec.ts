import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessContentDetailsComponent } from './access-content-details.component';

describe('AccessContentDetailsComponent', () => {
  let component: AccessContentDetailsComponent;
  let fixture: ComponentFixture<AccessContentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessContentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessContentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
