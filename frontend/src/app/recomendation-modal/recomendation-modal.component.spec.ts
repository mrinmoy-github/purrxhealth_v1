import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationModalComponent } from './recomendation-modal.component';

describe('RecomendationModalComponent', () => {
  let component: RecomendationModalComponent;
  let fixture: ComponentFixture<RecomendationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
