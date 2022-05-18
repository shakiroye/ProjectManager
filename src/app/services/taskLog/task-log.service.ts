import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskLog } from './task-log';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getTaskLogs(): Observable<TaskLog[]> {
    return this.http.get<TaskLog[]>(`${this.apiServerUrl}/task-log/all`);
  }

  public addTaskLog(taskLog: TaskLog, username: String): Observable<TaskLog> {
    return this.http.post<TaskLog>(
      `${this.apiServerUrl}/${username}/task-log/add`,
      taskLog
    );
  }
}
