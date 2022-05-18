import { HttpErrorResponse } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/services/project/project';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-proj-task-chart',
  templateUrl: './proj-task-chart.component.html',
  styleUrls: ['./proj-task-chart.component.scss'],
})
export class ProjTaskChartComponent implements OnInit {
  chart: any;
  projects: Project[] = [];

  labels: string[] = [];
  data: number[] = [];
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.chart = document.getElementById('chartpt');
    Chart.register(...registerables);
    this.getProjects();
  }

  public getProjects(): void {
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        for (let i = 0; i < this.projects.length; i++) {
          this.labels[i] = this.projects[i].projectName;
          this.data[i] = this.projects[i].tasks.length;
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
            label: 'Le nombre de taches par projet',
            backgroundColor: 'rgba(0, 60, 60, 0.7)',
            borderColor: 'rgb(0, 60, 60)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0, 60, 60)',
          },
        ],
      },
    });
  }
}
