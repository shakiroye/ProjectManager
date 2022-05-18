import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company/company.service';
import { Project } from 'src/app/services/project/project';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { CompanyComponent } from '../company/company.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;

  public editUser!: User;

  idToEdit!: string;

  user: User = {
    username: '',
    adminRole: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    taskLogs: [],
  };

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idToEdit = data;
  }

  ngOnInit(): void {
    this.onSet();
  }

  public onSet() {
    this.userService.getUserByUsername(this.idToEdit).subscribe(
      (response: User) => {
        this.editUser = response;
        this.user.username = this.editUser.username;
        this.user.email = this.editUser.email;
        this.user.firstName = this.editUser.firstName;
        this.user.lastName = this.editUser.lastName;
        this.user.password = this.editUser.password;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onEdit(updateForm: NgForm) {
    this.userService.updateUser(updateForm.value, 'admin').subscribe(
      (response: User) => {
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    //console.log(updateForm.value);
  }
}
