import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuTestComponent } from './main-menu-test.component';

describe('MainMenuTestComponent', () => {
  let component: MainMenuTestComponent;
  let fixture: ComponentFixture<MainMenuTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
