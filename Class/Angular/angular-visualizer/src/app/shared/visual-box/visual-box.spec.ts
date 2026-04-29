import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualBox } from './visual-box';

describe('VisualBox', () => {
  let component: VisualBox;
  let fixture: ComponentFixture<VisualBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualBox],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
