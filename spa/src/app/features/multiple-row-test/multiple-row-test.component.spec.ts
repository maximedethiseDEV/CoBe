import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRowTestComponent } from './multiple-row-test.component';

describe('MultipleRowTestComponent', () => {
  let component: MultipleRowTestComponent;
  let fixture: ComponentFixture<MultipleRowTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleRowTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRowTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
