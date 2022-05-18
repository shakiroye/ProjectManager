import { TaskLog } from '../taskLog/task-log';

export interface User {
  username: string;
  adminRole: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  taskLogs: Array<TaskLog>;
}
