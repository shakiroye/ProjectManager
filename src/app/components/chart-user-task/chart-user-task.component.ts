import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chart-user-task',
  templateUrl: './chart-user-task.component.html',
  styleUrls: ['./chart-user-task.component.scss'],
})
export class ChartUserTaskComponent implements OnInit {
  chart: any;
  users: User[] = [];
  labels: string[] = [];
  color: string[] = [];
  hoverColor: string[] = [];
  data: number[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.chart = document.getElementById('chart');
    Chart.register(...registerables);
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        for (let i = 0; i < this.users.length; i++) {
          this.labels[i] = this.users[i].username;
          this.data[i] = this.users[i].taskLogs.length;
          this.color[i] =
            'rgba(' +
            0 +
            ', ' +
            40 * (i + 1) +
            ', ' +
            (i + 1) * 60 +
            ', ' +
            0.6 +
            ')';
          this.hoverColor[i] =
            'rgb(' + 0 + ', ' + 40 * (i + 1) + ', ' + (i + 1) * 60 + ')';
        }
        this.loadChart(this.labels, this.data, this.color, this.hoverColor);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadChart(
    labels: string[],
    data: number[],
    color: string[],
    hoverColor: string[]
  ): void {
    new Chart(this.chart, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            label: 'Le nombre de tache par utilisateur',
            // backgroundColor: 'rgba(1, 104, 90)',
            backgroundColor: color,
            borderColor: hoverColor,
            borderWidth: 0,
            hoverBackgroundColor: hoverColor,
          },
        ],
      },
    });
  }
}
