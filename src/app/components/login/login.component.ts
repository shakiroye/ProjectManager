import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from 'src/app/services/auth/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isFormValid = false;
  areCredentialsInvalid = false;
  data = false;
  form!: FormGroup;

  @Output() userLogedEvent = new EventEmitter<string>();

  private loginUser!: User;

  private usersAuth: Auth[] = [];

  private currentForm!: NgForm;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUsers();
    console.log(location.href);
    // this.currentForm.value.username = localStorage.getItem('currentUsername');
    // this.currentForm.value.password = localStorage.getItem('currentPassword');
  }

  login(form: NgForm): void {
    if (!form.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.userService.getUserByUsername(form.value.username).subscribe(
      (response: User) => {
        this.loginUser = response;
        this.checkCredentials(form, response.adminRole);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private checkCredentials(form: NgForm, adminRole: string) {
    var loginData = new Auth(
      form.value.username,
      form.value.password,
      adminRole
    );
    console.log(this.loginUser.adminRole);
    if (!this.authService.authenticate(loginData)) {
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }
    if (this.authService.authenticate(loginData)) {
      // this.userLogedEvent.emit(loginData.getUsername());
      // localStorage.setItem('currentUsername', form.value.username);
      // localStorage.setItem('currentPassword', form.value.username);
    }
  }
}
