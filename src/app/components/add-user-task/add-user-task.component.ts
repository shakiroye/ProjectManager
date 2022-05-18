import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskLogService } from 'src/app/services/taskLog/task-log.service';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user-task',
  templateUrl: './add-user-task.component.html',
  styleUrls: ['./add-user-task.component.scss'],
})
export class AddUserTaskComponent implements OnInit {
  selectedValue!: string;
  public users: User[] = [];
  constructor(
    private taskLogService: TaskLogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onAddUserTask(addForm: NgForm) {
    console.log(addForm.value);
    console.log(addForm.value);
    this.taskLogService.addTaskLog(addForm.value, 'admin').subscribe(
      () => {
        this.taskLogService.getTaskLogs();
        addForm.resetForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.taskLogService.getTaskLogs();
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
}
