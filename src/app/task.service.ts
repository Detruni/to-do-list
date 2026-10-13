import { effect, Injectable, signal } from '@angular/core';
import { Task } from './task';

const STORAGE_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // On charge les tâches du localStorage au démarrage
  tasks = signal<Task[]>(this.load());

  constructor() {
    // Sauvegarde automatique à chaque modification de la liste
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
    });
  }

  private load(): Task[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  add(title: string, description: string, dueDate: string) {
    const now = new Date().toISOString();
    const task: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      done: false,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.update((tasks) => [...tasks, task]);
  }

  update(id: string, title: string, description: string, dueDate: string) {
    this.tasks.update((tasks) =>
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              title: title.trim(),
              description: description.trim() || undefined,
              dueDate: dueDate || undefined,
              updatedAt: new Date().toISOString(),
            }
          : t,
      ),
    );
  }

  toggle(id: string) {
    this.tasks.update((tasks) =>
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done, updatedAt: new Date().toISOString() } : t,
      ),
    );
  }

  remove(id: string) {
    this.tasks.update((tasks) => tasks.filter((t) => t.id !== id));
  }
}
