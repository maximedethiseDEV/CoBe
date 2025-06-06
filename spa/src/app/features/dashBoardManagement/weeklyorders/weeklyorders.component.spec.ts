import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyordersComponent } from './weeklyorders.component';

describe('WeeklyordersComponent', () => {
  let component: WeeklyordersComponent;
  let fixture: ComponentFixture<WeeklyordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
