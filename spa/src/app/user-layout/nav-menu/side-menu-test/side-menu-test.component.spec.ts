import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuTestComponent } from './side-menu-test.component';

describe('SideMenuTestComponent', () => {
  let component: SideMenuTestComponent;
  let fixture: ComponentFixture<SideMenuTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
