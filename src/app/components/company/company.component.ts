import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/services/company/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  public companies: Company[] = [];

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog,
    public deleteDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  public searchCompanies(key: any): void {
    const results: Company[] = [];
    for (const company of this.companies) {
      if (company.companyName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(company);
      }
    }
    this.companies = results;
    if (results.length === 0 || !key) {
      this.getCompanies();
    }
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

  openAddDialog() {
    const dialogRef = this.dialog.open(AddCompanyComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete(id: number) {
    var r = confirm('Etes-vous sur de supprimer la compagnie?');
    if (r !== false) {
      this.companyService.deleteCompany('admin', id).subscribe(
        (response: void) => {
          this.getCompanies();
        },
        (error: HttpErrorResponse) => {
          alert('Impossible de supprimer. La compagnie a des projets');
          this.getCompanies();
        }
      );
    }
  }
  onEdit(id: number) {}
}
