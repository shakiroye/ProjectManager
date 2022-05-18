import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskLog } from 'src/app/services/taskLog/task-log';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public users: User[] = [];

  taskLog!: TaskLog;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public searchUsers(key: string): void {
    const results: User[] = [];
    for (const user of this.users) {
      if (
        user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
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
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(username: string) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: username,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete(id: String) {
    var r = confirm("Etes-vous sur de supprimer l'utilisateur?");
    if (r !== false) {
      this.userService.deleteUser('admin', id).subscribe(
        (response: void) => {
          this.getUsers();
        },
        (error: HttpErrorResponse) => {
          alert("Impossible de supprimer. L'utilisateur  a des projets");
          this.getUsers();
        }
      );
    }
  }
  onEdit(id: String) {}
}
