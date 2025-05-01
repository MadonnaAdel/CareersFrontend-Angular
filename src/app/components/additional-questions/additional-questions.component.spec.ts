import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalQuestionsComponent } from './additional-questions.component';

describe('AdditionalQuestionsComponent', () => {
  let component: AdditionalQuestionsComponent;
  let fixture: ComponentFixture<AdditionalQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
