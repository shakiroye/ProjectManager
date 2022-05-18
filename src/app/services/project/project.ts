import { Company } from '../company/company';
import { Task } from '../task/task';

export interface Project {
  idProject: number;
  projectName: string;
  company: Company;
  companyId: number;
  tasks: Array<Task>;
}
