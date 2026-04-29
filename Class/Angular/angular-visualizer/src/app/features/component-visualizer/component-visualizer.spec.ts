import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentVisualizer } from './component-visualizer';

describe('ComponentVisualizer', () => {
  let component: ComponentVisualizer;
  let fixture: ComponentFixture<ComponentVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentVisualizer],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentVisualizer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
