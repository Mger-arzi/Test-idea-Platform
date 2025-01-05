import { useEffect, useState } from 'react';
import type { Task, Column as ColumnType } from './types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import bxs_happy from './assets/icons/bxs_happy-alt.svg';
import smile from './assets/icons/bxs_smile.svg';
import upsideDown from './assets/icons/bxs_upside-down.svg'
import bxs_ghost from './assets/icons/bxs_ghost.svg'
import deleteIcon from './assets/icons/trash.svg'
import { Column } from './components/column/Column';
import { Button } from '@teamlead.incubator/ui-kit';
const COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'To Do', icon: bxs_happy, addTask: true },
  { id: 'in_progress', title: 'In Progress', icon: smile, },
  { id: 'review', title: 'Review', icon: upsideDown, },
  { id: 'done', title: 'Done', icon: bxs_ghost, deleteTask: true },

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
  // {
  //   "id": "3",
  //   "type": "in_progress",
  //   "startDay": 1767292800000,
  //   "endDay": 1767379200000,
  //   "text": "Написать документацию для команды разработчиков."
  // },
  // {
  //   "id": "4",
  //   "type": "review",
  //   "startDay": 1767379200000,
  //   "endDay": 1767465600000,
  //   "text": "Провести код-ревью нового модуля."
  // },
  // {
  //   "id": "5",
  //   "type": "done",
  //   "startDay": 1767465600000,
  //   "endDay": 1767552000000,
  //   "text": "Тестирование системы после обновления."
  // },
  // {
  //   "id": "6",
  //   "type": "todo",
  //   "startDay": 1767552000000,
  //   "endDay": 1767638400000,
  //   "text": "Подготовить презентацию для клиента."
  // },
  // {
  //   "id": "7",
  //   "type": "in_progress",
  //   "startDay": 1767638400000,
  //   "endDay": 1767724800000,
  //   "text": "Оптимизировать алгоритмы обработки данных."
  // },
  // // {
  // //   "id": "8",
  // //   "type": "review",
  // //   "startDay": 1767724800000,
  // //   "endDay": 1767811200000,
  // //   "text": "Проверить результаты нагрузочного тестирования."
  // // },
  // // {
  // //   "id": "9",
  // //   "type": "todo",
  // //   "startDay": 1767811200000,
  // //   "endDay": 1767897600000,
  // //   "text": "Составить отчет по итогам проекта."
  // // },
  // // {
  // //   "id": "10",
  // //   "type": "done",
  // //   "startDay": 1767897600000,
  // //   "endDay": 1767984000000,
  // //   "text": "Внедрить исправления по результатам тестирования."
  // // },
  // // {
  // //   "id": "11",
  // //   "type": "todo",
  // //   "startDay": 1700000000000,
  // //   "endDay": 1700500000000,
  // //   "text": "Обновить базу знаний компании до конца года."
  // // },
  // // {
  // //   "id": "12",
  // //   "type": "in_progress",
  // //   "startDay": 1768070400000,
  // //   "endDay": 1768156800000,
  // //   "text": "Разработать прототип нового интерфейса."
  // // },
  // // {
  // //   "id": "13",
  // //   "type": "review",
  // //   "startDay": 1768156800000,
  // //   "endDay": 1768243200000,
  // //   "text": "Анализировать метрики производительности."
  // // },
  // // {
  // //   "id": "14",
  // //   "type": "done",
  // //   "startDay": 1768243200000,
  // //   "endDay": 1768329600000,
  // //   "text": "Закрыть задачи по техническому долгу."
  // // },
  // // {
  // //   "id": "15",
  // //   "type": "todo",
  // //   "startDay": 1768329600000,
  // //   "endDay": 1768416000000,
  // //   "text": "Организовать тренинг для сотрудников."
  // // },
  // // {
  // //   "id": "16",
  // //   "type": "review",
  // //   "startDay": 1690000000000,
  // //   "endDay": 1690500000000,
  // //   "text": "Провести проверку безопасности системы."
  // // },
  // // {
  // //   "id": "17",
  // //   "type": "done",
  // //   "startDay": 1692000000000,
  // //   "endDay": 1693000000000,
  // //   "text": "Закрыть критические баги в системе."
  // // }
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

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
  function handleDragEnd(event: DragEndEvent) {
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
  }
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
  const editTask = (id: string, updatedTask: Omit<Task, 'id'>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };
  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.type === column.id)}
                icon={column.icon}
                addTask={column.addTask ? <Button onClick={addTask}>+Добавить</Button> : null}
                editTask={editTask}
                deleteTask={column.deleteTask ? <Button onClick={deleteTask}>
                  <img src={deleteIcon} alt='' />
                </Button> : null}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}
