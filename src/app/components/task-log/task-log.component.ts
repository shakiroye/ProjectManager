import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskLog } from 'src/app/services/taskLog/task-log';
import { TaskLogService } from 'src/app/services/taskLog/task-log.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.scss'],
})
export class TaskLogComponent implements OnInit, AfterViewInit {
  public taskLogs: TaskLog[] = [];
  // taskLog: TaskLog = {
  //   idTaskLog: 0,
  //   taskDescription: '',
  //   taskLogDate: new Date(),
  //   taskMinutes: 0,
  //   username: '',
  //   taskId: 0,
  // };

  // ELEMENT_DATA: TaskLog[] = [];
  // displayedColumns: string[] = [];
  // dataSource = new MatTableDataSource<TaskLog>(this.ELEMENT_DATA);
  // //dataSource = new MatTableDataSource<TaskLog>(this.taskLogs);

  // constructor(private taskLogService: TaskLogService) {}

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  // }

  // ngOnInit(): void {
  //   this.getTaskLogs();
  //   console.log(this.dataSource);
  // }

  // public getTaskLogs(): void {
  //   this.taskLogService.getTaskLogs().subscribe(
  //     (response: TaskLog[]) => {
  //       this.taskLogs = response;
  //       this.ELEMENT_DATA = this.taskLogs;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  displayedColumns: string[] = [
    'idTaskLog',
    'taskDescription',
    'taskLogDate',
    'taskMinutes',
    'username',
  ];
  dataSource = new MatTableDataSource<TaskLog>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getTaskLogs();
  }
  constructor(private taskLogService: TaskLogService) {}

  public getTaskLogs(): void {
    this.taskLogService.getTaskLogs().subscribe(
      (response: TaskLog[]) => {
        this.taskLogs = response;
        console.log(this.paginator);
        this.dataSource = new MatTableDataSource<TaskLog>(this.taskLogs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
