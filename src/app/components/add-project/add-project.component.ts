import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/services/company/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { AddProject } from 'src/app/services/project/addProject';
import { Project } from 'src/app/services/project/project';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  public companies!: Company[];

  constructor(
    private projectService: ProjectService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects();
    this.getCompanies();
  }
  public onAddProject(addForm: NgForm): void {
    this.projectService.addProject(addForm.value, 'admin').subscribe(
      (response: Project) => {
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.projectService.getProjects();
      }
    );
  }

  public getCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (response: Company[]) => {
        this.companies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
