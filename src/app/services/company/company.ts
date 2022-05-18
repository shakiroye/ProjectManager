import { Project } from '../project/project';

export interface Company {
  idCompany: number;
  companyName: string;
  projects: Array<Project>;
}
