import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/services/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { Task } from 'src/app/services/task/task';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  public projects!: Project[];
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks();
    this.getProjects();
  }

  public onAddTask(addForm: NgForm): void {
    this.taskService.addTask(addForm.value, 'admin').subscribe(
      (response: Task) => {
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.taskService.getTasks();
      }
    );
  }

  public getProjects(): void {
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
