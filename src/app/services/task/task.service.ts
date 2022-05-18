import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiServerUrl}/task/all`);
  }

  public addTask(task: Task, username: String): Observable<Task> {
    return this.http.post<Task>(
      `${this.apiServerUrl}/${username}/task/add`,
      task
    );
  }

  public deleteTask(username: String, idTask: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/${username}/task/delete/${idTask}`
    );
  }
}
