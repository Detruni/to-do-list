import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { today, validateTask } from '../task';
import { TaskService } from '../task.service';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, TaskItem],
  templateUrl: './task-list.html',
})
export class TaskList {
  taskService = inject(TaskService);
  today = today();

  // Filtres : séparés de la liste, le service garde toujours toutes les tâches
  status = signal<'all' | 'todo' | 'done'>('all');
  query = signal('');

  // Tâches affichées : filtrées par statut et texte, triées par échéance puis titre
  visibleTasks = computed(() => {
    const status = this.status();
    const query = this.query().trim().toLowerCase();
    return this.taskService
      .tasks()
      .filter((t) => status === 'all' || t.done === (status === 'done'))
      .filter((t) => t.title.toLowerCase().includes(query))
      .sort(
        (a, b) =>
          // Les tâches sans échéance sont placées à la fin (9999-12-31)
          (a.dueDate ?? '9999-12-31').localeCompare(b.dueDate ?? '9999-12-31') ||
          a.title.localeCompare(b.title),
      );
  });

  doneCount = computed(() => this.taskService.tasks().filter((t) => t.done).length);
  todoCount = computed(() => this.taskService.tasks().length - this.doneCount());

  // Champs du formulaire, liés avec [(ngModel)]
  title = '';
  description = '';
  dueDate = '';

  get errors() {
    return validateTask(this.title, this.dueDate);
  }

  addTask() {
    if (this.errors.title || this.errors.dueDate) return;

    this.taskService.add(this.title, this.description, this.dueDate);

    // Réinitialisation du formulaire
    this.title = '';
    this.description = '';
    this.dueDate = '';
  }
}
