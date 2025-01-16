
export type TaskType = 'todo' | 'in_progress' | 'done' | 'review';

export type Task = {
  id: string;
  startDay: number | string
  endDay: number | string
  type: string;
  text: string;
};

export type ColumnType = {
  id: string;
  title: string;
  icon: string
  addTask: boolean
  isDeleteTasksEnabled: boolean
};
