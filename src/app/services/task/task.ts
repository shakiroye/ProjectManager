import { TaskLog } from '../taskLog/task-log';

export interface Task {
  idTask: number;
  taskName: string;
  taskLogs: Array<TaskLog>;
  projectId: number;
  projectName: string;
}
