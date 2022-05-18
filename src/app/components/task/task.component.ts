import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/services/task/task';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskLogService } from 'src/app/services/taskLog/task-log.service';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddUserTaskComponent } from '../add-user-task/add-user-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public tasks: Task[] = [];
  public users: User[] = [];
  task: Task = {
    idTask: 0,
    taskName: '',
    taskLogs: [],
    projectId: 0,
    projectName: '',
  };

  addFormGroup = new FormGroup({
    user: new FormGroup({
      username: new FormControl(),
    }),
    task: new FormGroup({
      idTask: new FormControl(),
    }),
    taskDescription: new FormControl(),
    taskLogDate: new FormControl(),
    taskMinutes: new FormControl(),
  });

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    public dialog: MatDialog,
    private taskLogService: TaskLogService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
  }

  public searchTasks(key: any): void {
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (
        task.taskName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        task.idTask === key
      ) {
        results.push(task);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !key) {
      this.getTasks();
    }
  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAssignDialog() {
    const dialogRef = this.dialog.open(AddUserTaskComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete(id: number) {
    var r = confirm('Etes-vous sur de supprimer la tache?');
    if (r !== false) {
      this.taskService.deleteTask('admin', id).subscribe(
        (response: void) => {
          console.log(response);
          this.getTasks();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          this.getTasks();
        }
      );
    }
  }
  onEdit(id: number) {}
  onAddUserTask(idTask: number) {
    this.addFormGroup.patchValue({
      task: {
        idTask: idTask,
      },
    });
    console.log(this.addFormGroup);
    this.taskLogService.addTaskLog(this.addFormGroup.value, 'admin').subscribe(
      () => {
        this.taskLogService.getTaskLogs();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.taskLogService.getTaskLogs();
      }
    );
  }
}
