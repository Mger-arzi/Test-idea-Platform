
export type TaskType = 'todo' | 'in_progress' | 'done' | 'review';

export type Task = {
  id: string;
  startDay: number
  endDay: number;
  type: TaskType;
  text: string;
};

export type Column = {
  id: TaskType;
  title: string;
  icon: string
  addTask?: boolean
  deleteTask?: boolean
};
