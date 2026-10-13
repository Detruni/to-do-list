import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-stats',
  template: `
    <h1>Statistiques</h1>
    <div class="card">
      <p>Total : {{ total() }}</p>
      <p>Faites : {{ done() }}</p>
      <p>À faire : {{ total() - done() }}</p>
      <p>Terminées : {{ percent() }} %</p>
    </div>
  `,
})
export class Stats {
  private taskService = inject(TaskService);

  total = computed(() => this.taskService.tasks().length);
  done = computed(() => this.taskService.tasks().filter((t) => t.done).length);
  // 0 % si la liste est vide (évite la division par zéro)
  percent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.done() / this.total()) * 100),
  );
}
