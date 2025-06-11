import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponentOld } from './schedule.component-old';

describe('ScheduleComponentOld', () => {
  let component: ScheduleComponentOld;
  let fixture: ComponentFixture<ScheduleComponentOld>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleComponentOld]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleComponentOld);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
