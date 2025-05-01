import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsCardGroupComponent } from './applicants-card-group.component';

describe('ApplicantsCardGroupComponent', () => {
  let component: ApplicantsCardGroupComponent;
  let fixture: ComponentFixture<ApplicantsCardGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantsCardGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsCardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
