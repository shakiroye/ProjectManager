import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from './company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiServerUrl}/company/all`);
  }

  public getCompanyById(id: number): Observable<Company> {
    console.log(`${this.apiServerUrl}/company/find/${id}`);
    return this.http.get<Company>(`${this.apiServerUrl}/company/find/${id}`);
  }

  public addCompany(company: Company, username: String): Observable<Company> {
    return this.http.post<Company>(
      `${this.apiServerUrl}/${username}/company/add`,
      company
    );
  }

  public updateCompany(
    company: Company,
    username: String
  ): Observable<Company> {
    return this.http.put<Company>(
      `${this.apiServerUrl}/${username}/company/update`,
      company
    );
  }
  public deleteCompany(username: String, idCompany: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/${username}/company/delete/${idCompany}`
    );
  }
}
