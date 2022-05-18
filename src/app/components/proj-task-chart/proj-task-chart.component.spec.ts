import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjTaskChartComponent } from './proj-task-chart.component';

describe('ProjTaskChartComponent', () => {
  let component: ProjTaskChartComponent;
  let fixture: ComponentFixture<ProjTaskChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjTaskChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjTaskChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
