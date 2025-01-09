import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Task, Column as ColumnType } from './types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import bxs_happy from './assets/icons/bxs_happy-alt.svg';
import smile from './assets/icons/bxs_smile.svg';
import upsideDown from './assets/icons/bxs_upside-down.svg'
import bxs_ghost from './assets/icons/bxs_ghost.svg'
import deleteIcon from './assets/icons/trash.svg'
import { Button } from '@teamlead.incubator/ui-kit';
import { Column } from './components/column';

const COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'To Do', icon: bxs_happy, addTask: true, isDeleteTasksEnabled: false },
  { id: 'in_progress', title: 'In Progress', icon: smile, addTask: false, isDeleteTasksEnabled: false },
  { id: 'review', title: 'Review', icon: upsideDown, addTask: false, isDeleteTasksEnabled: false },
  { id: 'done', title: 'Done', icon: bxs_ghost, addTask: false, isDeleteTasksEnabled: true, },

];
const INITIAL_TASKS: Task[] = [
  {
    "id": "1",
    "type": "done",
    "startDay": 1700000000000,
    "endDay": 1703740800000,
    "text": "Завершить рефакторинг старого кода."
  },
  {
    "id": "2",
    "type": "todo",
    "startDay": 1767206400000,
    "endDay": 1767292800000,
    "text": "Разработать план по внедрению новой функциональности."
  },
  {
    "id": "3",
    "type": "in_progress",
    "startDay": 1767292800000,
    "endDay": 1767379200000,
    "text": "Написать документацию для команды разработчиков."
  },
  {
    "id": "4",
    "type": "review",
    "startDay": 1767379200000,
    "endDay": 1767465600000,
    "text": "Провести код-ревью нового модуля."
  },

];
function convertToMap(tasks: Task[]): Map<string, Task[]> {
  const taskMap = new Map<string, Task[]>();

  tasks.forEach(task => {
    if (!taskMap.has(task.type)) {
      taskMap.set(task.type, []);
    }
    taskMap.get(task.type)?.push(task);
  });

  return taskMap;
}
export default function Board() {

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [tasksMap, setTasksMap] = useState(() => convertToMap(INITIAL_TASKS))
  useEffect(() => {
    // Загрузка задач из localStorage при инициализации  
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Сохранение задач в localStorage при их изменении  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['type'];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            type: newStatus,
          }
          : task,
      ),
    );
  }, [])
  const addTask = () => {
    const newTask: Task = {
      id: Math.random().toString(),
      type: 'todo',
      startDay: Date.now(),
      endDay: Date.now() + 1000 * 60 * 60 * 24, // 1 день  
      text: 'Напиши следующий шаг к успеху',
    };

    setTasks((prevTasks) => [newTask, ...prevTasks,]);

  };
  const deleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.type !== 'done'));
  };

  const editTask = useCallback(
    (id: string, updatedTask: Omit<Task, 'id'>) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    }, [])

  const addTaskButton = useMemo(() => {
    return (
      <Button onClick={addTask}>+Добавить</Button>
    )
  }, [])

  const deleteTaskButton = useMemo(() => {
    return (
      <Button onClick={deleteTask}>
        <img src={deleteIcon} alt='' />
      </Button>
    )
  }, [])
  console.log('Board')
  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasksMap.get(column.id)}
                icon={column.icon}
                addTask={column.addTask ? addTaskButton : null}
                editTask={editTask}
                deleteTask={column.isDeleteTasksEnabled ? deleteTaskButton : null}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}
