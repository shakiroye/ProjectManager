import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyService } from '../company/company.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {}

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiServerUrl}/project/all`);
  }
  public getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiServerUrl}/project/find/${id}`);
  }

  public addProject(project: Project, username: String): Observable<Project> {
    return this.http.post<Project>(
      `${this.apiServerUrl}/${username}/project/add`,
      project
    );
  }

  public updateProject(
    project: Project,
    username: String
  ): Observable<Project> {
    return this.http.put<Project>(
      `${this.apiServerUrl}/${username}/project/update`,
      project
    );
  }

  public deleteProject(username: String, idProject: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/${username}/project/delete/${idProject}`
    );
  }
}
