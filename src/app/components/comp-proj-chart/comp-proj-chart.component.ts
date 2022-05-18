import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Company } from 'src/app/services/company/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Project } from 'src/app/services/project/project';

@Component({
  selector: 'app-comp-proj-chart',
  templateUrl: './comp-proj-chart.component.html',
  styleUrls: ['./comp-proj-chart.component.scss'],
})
export class CompProjChartComponent implements OnInit {
  chart: any;
  companies: Company[] = [];
  projects: Project[] = [];
  labels: string[] = [];
  data: number[] = [];
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.chart = document.getElementById('chartcp');
    Chart.register(...registerables);
    this.getCompanies();
  }

  public getCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (response: Company[]) => {
        this.companies = response;
        for (let i = 0; i < this.companies.length; i++) {
          this.labels[i] = this.companies[i].companyName;
          this.data[i] = this.companies[i].projects.length;
        }
        this.loadChart(this.labels, this.data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadChart(labels: string[], data: number[]): void {
    new Chart(this.chart, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            label: 'Le nombre de projets par compagnie',
            backgroundColor: 'rgba(1, 104, 90, 0.2)',
            borderColor: 'rgb(1, 104, 90)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(1, 104, 90)',
          },
        ],
      },
    });
  }
}
