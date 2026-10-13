import { Component, inject } from '@angular/core';
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
