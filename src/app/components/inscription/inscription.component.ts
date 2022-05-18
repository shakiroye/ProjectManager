import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskLog } from 'src/app/services/taskLog/task-log';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
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
    private formBuilder: FormBuilder,
    private router: Router
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
  }

  public addUser(): void {
    this.userService.addUser(this.form.getRawValue(), 'admin').subscribe(
      (res: User) => {
        this.userService.getUsers();
        this.router.navigate(['/user']);
      },
      (err) => {
        this.userService.getUsers();
        this.router.navigate(['/user']);
      }
    );
  }
}
