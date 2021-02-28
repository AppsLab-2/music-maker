import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneEditorComponent } from './tone-editor.component';

describe('ToneEditorComponent', () => {
  let component: ToneEditorComponent;
  let fixture: ComponentFixture<ToneEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToneEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
