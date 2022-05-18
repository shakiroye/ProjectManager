import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';
import { AddCompany } from 'src/app/services/company/addCompany';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      (response) => {},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCompany(addForm: NgForm): void {
    this.companyService.addCompany(addForm.value, 'admin').subscribe(
      (response: AddCompany) => {
        this.companyService.getCompanies();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.companyService.getCompanies();
      }
    );

    this.companyService.getCompanies().subscribe(
      (response) => {},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
