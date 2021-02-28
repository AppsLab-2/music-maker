import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternPropertiesComponent } from './pattern-properties.component';

describe('PatternPropertiesComponent', () => {
  let component: PatternPropertiesComponent;
  let fixture: ComponentFixture<PatternPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
