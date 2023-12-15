import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomiesComponent } from './romies.component';

describe('AboutComponent', () => {
  let component: RomiesComponent;
  let fixture: ComponentFixture<RomiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RomiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RomiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
