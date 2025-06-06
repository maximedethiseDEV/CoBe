import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningheaderComponent } from './planningheader.component';

describe('PlanningheaderComponent', () => {
  let component: PlanningheaderComponent;
  let fixture: ComponentFixture<PlanningheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
