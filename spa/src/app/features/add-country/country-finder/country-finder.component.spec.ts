import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryFinderComponent } from './country-finder.component';

describe('CountryFinderComponent', () => {
  let component: CountryFinderComponent;
  let fixture: ComponentFixture<CountryFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
