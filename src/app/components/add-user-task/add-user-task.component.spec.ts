import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserTaskComponent } from './add-user-task.component';

describe('AddUserTaskComponent', () => {
  let component: AddUserTaskComponent;
  let fixture: ComponentFixture<AddUserTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
