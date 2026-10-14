import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, today, validateTask } from '../task';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.html',
})
export class TaskItem {
  // Données reçues du parent et événements renvoyés au parent
  task = input.required<Task>();
  toggled = output<string>();
  removed = output<string>();
  saved = output<{ id: string; title: string; description: string; dueDate: string }>();

  today = today();
  editing = false;
  title = '';
  description = '';
  dueDate = '';

  get errors() {
    return validateTask(this.title, this.dueDate);
  }

  startEdit() {
    // Préremplissage du formulaire avec les valeurs actuelles
    this.title = this.task().title;
    this.description = this.task().description ?? '';
    this.dueDate = this.task().dueDate ?? '';
    this.editing = true;
  }

  save() {
    if (this.errors.title || this.errors.dueDate) return;
    // On transmet les modifications au composant parent
    this.saved.emit({
      id: this.task().id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
    });
    this.editing = false;
  }

  remove() {
    // Confirmation avant suppression
    if (confirm(`Supprimer la tâche « ${this.task().title} » ?`)) {
      this.removed.emit(this.task().id);
    }
  }
}
