import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Company } from 'src/app/services/company/company';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Project } from 'src/app/services/project/project';
import { User } from 'src/app/services/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public nbCompanies: number = 0;
  public nbProjects: number = 0;
  public nbUsers: number = 0;
  public nbTasks: number = 0;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getNbCompanies();
    this.getNbProjects();
    this.getNbTasks();
    this.getNbUsers();
  }

  public getNbCompanies(): void {
    this.dashboardService.getCompanies().subscribe(
      (response: Company[]) => {
        this.nbCompanies = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getNbProjects(): void {
    this.dashboardService.getProjects().subscribe(
      (response: Project[]) => {
        this.nbProjects = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getNbTasks(): void {
    this.dashboardService.getTasks().subscribe(
      (response: Task[]) => {
        this.nbTasks = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getNbUsers(): void {
    this.dashboardService.getUsers().subscribe(
      (response: User[]) => {
        this.nbUsers = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
