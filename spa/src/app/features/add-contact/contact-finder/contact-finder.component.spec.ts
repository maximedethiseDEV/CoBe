import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFinderComponent } from './contact-finder.component';

describe('ContactFinderComponent', () => {
  let component: ContactFinderComponent;
  let fixture: ComponentFixture<ContactFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
