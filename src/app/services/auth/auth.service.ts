import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersAuth: Auth[] = [];
  private users: User[] = [];

  // isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  isAuthenticated: boolean;
  // isAdmin = localStorage.getItem('isAdmin') === 'true';
  isAdmin: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  authenticate(loginData: Auth): boolean {
    if (this.checkCredentials(loginData)) {
      if (loginData.getAdmin() !== 'Y') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'false');
        this.isAdmin = localStorage.getItem('isAdmin') === 'true';
        this.isAuthenticated =
          localStorage.getItem('isAuthenticated') === 'true';
        this.router.navigate(['task-log']);
        return true;
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      // this.isAdmin = true;
      // this.isAuthenticated = true;
      this.router.navigate(['dashboard']);
      return true;
    }
    localStorage.setItem('isAuthenticated', 'false');
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    // this.isAuthenticated = false;
    return false;
  }

  public getUsers() {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        this.users.forEach((element) => {
          this.usersAuth.push(
            new Auth(element.username, element.password, element.adminRole)
          );
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private checkCredentials(loginData: Auth): boolean {
    return (
      this.checkUsername(loginData.getUsername()) &&
      this.checkPassword(loginData.getPassword())
    );
  }

  private checkUsername(username: string): boolean {
    for (let i = 0; i < this.usersAuth.length; i++) {
      if (username === this.usersAuth[i].getUsername()) {
        return true;
        break;
      }
    }
    return false;
  }
  private checkPassword(password: string): boolean {
    for (let i = 0; i < this.usersAuth.length; i++) {
      if (password === this.usersAuth[i].getPassword()) {
        return true;
        break;
      }
    }
    return false;
  }

  public logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  }
}
