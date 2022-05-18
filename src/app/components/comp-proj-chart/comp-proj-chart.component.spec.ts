import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompProjChartComponent } from './comp-proj-chart.component';

describe('CompProjChartComponent', () => {
  let component: CompProjChartComponent;
  let fixture: ComponentFixture<CompProjChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompProjChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompProjChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
