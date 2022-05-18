import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/services/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyComponent } from '../company/company.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  public projects: Project[] = [];
  project: Project = {
    idProject: 0,
    projectName: '',
    tasks: [],
    companyId: 0,
    company: { idCompany: 0, companyName: '', projects: new Array() },
  };

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  public searchProjects(key: any): void {
    const results: Project[] = [];
    for (const project of this.projects) {
      if (
        project.projectName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        project.idProject === key
      ) {
        results.push(project);
      }
    }
    this.projects = results;
    if (results.length === 0 || !key) {
      this.getProjects();
    }
  }

  public getProjects(): void {
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProjectComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete(id: number) {
    var r = confirm('Etes-vous sur de supprimer le projet?');
    if (r !== false) {
      this.projectService.deleteProject('admin', id).subscribe(
        (response: void) => {
          console.log(response);
          this.getProjects();
        },
        (error: HttpErrorResponse) => {
          alert('Impossible de supprimer. Le projet a des taches');
          this.getProjects();
        }
      );
    }
  }
  onEdit(id: number) {}
}
