import { Company } from '../company/company';
import { Task } from '../task/task';

export interface AddProject {
  projectName: string;
  idCompany: number;
  company: Company;
}
