import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUserTaskComponent } from './chart-user-task.component';

describe('ChartUserTaskComponent', () => {
  let component: ChartUserTaskComponent;
  let fixture: ComponentFixture<ChartUserTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartUserTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartUserTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
