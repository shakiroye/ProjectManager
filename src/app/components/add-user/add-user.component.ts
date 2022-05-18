import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TaskLog } from 'src/app/services/taskLog/task-log';
import { AddUser } from 'src/app/services/user/addUser';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;

  taskLog!: TaskLog;
  user: User = {
    username: '',
    firstName: '',
    lastName: '',
    adminRole: 'n',
    email: '',
    password: '',
    taskLogs: [this.taskLog],
  };
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      firstName: '',
      lastName: '',
      adminRole: 'n',
      email: '',
      password: '',
      taskLogs: [this.taskLog],
    });
    this.form.patchValue({
      adminRole: 'n',
    });
  }

  public onAddUser(addForm: NgForm): void {
    this.userService.addUser(addForm.value, 'admin').subscribe(
      (response: User) => {
        this.userService.getUsers();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.userService.getUsers();
      }
    );
  }
}
