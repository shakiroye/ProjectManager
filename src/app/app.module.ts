import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CompanyComponent } from './components/company/company.component';
import { TaskComponent } from './components/task/task.component';
import { TaskLogComponent } from './components/task-log/task-log.component';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { CompProjChartComponent } from './components/comp-proj-chart/comp-proj-chart.component';
import { ProjTaskChartComponent } from './components/proj-task-chart/proj-task-chart.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AuthGuard } from './guards/auth.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddUserTaskComponent } from './components/add-user-task/add-user-task.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { ChartUserTaskComponent } from './components/chart-user-task/chart-user-task.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'task-log', component: TaskLogComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    CompanyComponent,
    TaskComponent,
    TaskLogComponent,
    UserComponent,
    ProjectComponent,
    CompProjChartComponent,
    ProjTaskChartComponent,
    AddCompanyComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    AddUserTaskComponent,
    EditCompanyComponent,
    ChartUserTaskComponent,
    NotFoundComponent,
    EditUserComponent,
    EditProjectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
