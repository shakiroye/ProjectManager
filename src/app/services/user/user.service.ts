import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskLog } from '../taskLog/task-log';
import { UserLog } from '../user-log/user-log';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${username}`);
  }

  public getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/find/admins`);
  }

  public addUser(user: User, actionUsername: String): Observable<User> {
    return this.http.post<User>(
      `${this.apiServerUrl}/${actionUsername}/user/add`,
      user
    );
  }

  public deleteUser(
    actionUsername: String,
    username: String
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/${actionUsername}/user/delete/${username}`
    );
  }

  public addUserLog(
    actionUsername: String,
    userToAdd: UserLog
  ): Observable<UserLog> {
    return this.http.post<UserLog>(
      `${this.apiServerUrl}/${actionUsername}/app-user/add`,
      userToAdd,
      { withCredentials: true }
    );
  }

  public updateUser(user: User, username: String): Observable<User> {
    return this.http.put<User>(
      `${this.apiServerUrl}/${username}/user/update`,
      user
    );
  }
}
