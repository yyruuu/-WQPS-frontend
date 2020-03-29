import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTrainComponent } from './model-train.component';

describe('ModelTrainComponent', () => {
  let component: ModelTrainComponent;
  let fixture: ComponentFixture<ModelTrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
