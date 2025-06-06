import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderheaderComponent } from './orderheader.component';

describe('OrderheaderComponent', () => {
  let component: OrderheaderComponent;
  let fixture: ComponentFixture<OrderheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
