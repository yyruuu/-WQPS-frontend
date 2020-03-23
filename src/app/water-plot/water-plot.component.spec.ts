import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPlotComponent } from './water-plot.component';

describe('WaterPlotComponent', () => {
  let component: WaterPlotComponent;
  let fixture: ComponentFixture<WaterPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
