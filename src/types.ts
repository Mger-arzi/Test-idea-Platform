
export type TaskType = 'todo' | 'in_progress' | 'done' | 'review';

export type Task = {
  id: string;
  startDay: number | string
  endDay: number | string
  type: TaskType;
  text: string;
};

export type ColumnType = {
  id: TaskType;
  title: string;
  icon: string
  addTask: boolean
  isDeleteTasksEnabled: boolean
};
