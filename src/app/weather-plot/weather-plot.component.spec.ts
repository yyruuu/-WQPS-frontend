import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPlotComponent } from './weather-plot.component';

describe('WeatherPlotComponent', () => {
  let component: WeatherPlotComponent;
  let fixture: ComponentFixture<WeatherPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
