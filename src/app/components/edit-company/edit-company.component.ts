import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company } from 'src/app/services/company/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { CompanyComponent } from '../company/company.component';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent implements OnInit {
  form!: FormGroup;

  public editCompany!: Company;

  idToEdit!: number;

  companyToEdit: Company = {
    idCompany: 0,
    companyName: '',
    projects: [],
  };

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idToEdit = data;
  }

  ngOnInit(): void {
    this.onSet();
  }

  public onSet() {
    // this.form = this.formBuilder.group({
    //   idCompany: '',
    //   companyName: '',
    // });

    this.companyService.getCompanyById(this.idToEdit).subscribe(
      (response: Company) => {
        this.editCompany = response;
        this.companyToEdit.companyName = this.editCompany.companyName;
        this.companyToEdit.idCompany = this.editCompany.idCompany;
        // this.form.patchValue({
        //   idCompany: this.idToEdit,
        //   companyName: this.editCompany.companyName,
        // });
        // console.log(this.form.value);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onEdit(updateForm: NgForm) {
    this.companyService.updateCompany(updateForm.value, 'admin').subscribe(
      (response: Company) => {
        location.reload();
        this.companyService.getCompanies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
