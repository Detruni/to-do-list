import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../task.service';
import { today } from '../task';

@Component({
  selector: 'app-stats',
  template: `
    <h1>Statistiques</h1>

    <div class="stats-grid">
      <!-- KPI : progression globale -->
      <div class="card kpi">
        <h2>Progression</h2>
        <div
          class="progress-bar"
          role="progressbar"
          [attr.aria-valuenow]="percent()"
          aria-valuemin="0"
          aria-valuemax="100"
          [attr.aria-label]="'Progression globale : ' + percent() + '%'"
        >
          <div class="progress-fill" [style.width.%]="percent()"></div>
        </div>
        <p>{{ percent() }} % terminées</p>
      </div>

      <!-- KPI : compteurs -->
      @for (kpi of kpis(); track kpi.label) {
        <div class="card kpi">
          <h2>{{ kpi.label }}</h2>
          <span class="kpi-value">{{ kpi.value }}</span>
        </div>
      }

      <!-- KPI : en retard -->
      @if (overdue() > 0) {
        <div class="card kpi kpi-warning">
          <h2>En retard</h2>
          <span class="kpi-value">{{ overdue() }}</span>
        </div>
      }
    </div>
  `,
})
export class Stats {
  private taskService = inject(TaskService);

  total = computed(() => this.taskService.tasks().length);
  done = computed(() => this.taskService.tasks().filter((t) => t.done).length);
  percent = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.done() / this.total()) * 100),
  );
  overdue = computed(
    () =>
      this.taskService
        .tasks()
        .filter((t) => !t.done && t.dueDate && t.dueDate < today()).length,
  );

  // Liste de KPIs affichés dynamiquement avec @for
  kpis = computed(() => [
    { label: 'Total', value: this.total() },
    { label: 'Faites', value: this.done() },
    { label: 'À faire', value: this.total() - this.done() },
  ]);
}
