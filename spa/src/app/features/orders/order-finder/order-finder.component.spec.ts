import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFinderComponent } from './order-finder.component';

describe('OrderFinderComponent', () => {
  let component: OrderFinderComponent;
  let fixture: ComponentFixture<OrderFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
