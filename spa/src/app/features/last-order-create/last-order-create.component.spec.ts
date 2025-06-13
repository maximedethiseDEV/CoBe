import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastOrderCreateComponent } from './last-order-create.component';

describe('LastOrderCreateComponent', () => {
  let component: LastOrderCreateComponent;
  let fixture: ComponentFixture<LastOrderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastOrderCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastOrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
