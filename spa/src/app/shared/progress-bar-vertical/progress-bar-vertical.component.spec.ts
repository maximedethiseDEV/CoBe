import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarVerticalComponent } from './progress-bar-vertical.component';

describe('ProgressBarVerticalComponent', () => {
  let component: ProgressBarVerticalComponent;
  let fixture: ComponentFixture<ProgressBarVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
