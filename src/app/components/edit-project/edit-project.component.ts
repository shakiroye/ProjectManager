import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/services/company/company';
import { Project } from 'src/app/services/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  form!: FormGroup;

  company!: Company;

  public editProject!: Project;

  idToEdit!: number;

  project: Project = {
    idProject: 0,
    projectName: '',
    company: this.company,
    companyId: 0,
    tasks: [],
  };

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idToEdit = data;
  }

  ngOnInit(): void {
    this.onSet();
  }

  public onSet() {
    this.projectService.getProjectById(this.idToEdit).subscribe(
      (response: Project) => {
        this.editProject = response;
        this.project.idProject = this.editProject.idProject;
        this.project.projectName = this.editProject.projectName;
        this.project.companyId = this.editProject.companyId;
        this.project.company = this.editProject.company;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onEdit(updateForm: NgForm) {
    console.log(updateForm.value);
  }
}
