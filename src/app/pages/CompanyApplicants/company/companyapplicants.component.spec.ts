import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyapplicantsComponent } from './companyapplicants.component';

describe('CompanyapplicantsComponent', () => {
  let component: CompanyapplicantsComponent;
  let fixture: ComponentFixture<CompanyapplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyapplicantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyapplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
