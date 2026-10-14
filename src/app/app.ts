import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <a routerLink="/" class="brand">
        <img src="logo.png" alt="Logo" class="logo" />
      </a>
      <nav aria-label="Navigation principale">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
          >Tâches</a
        >
        <a routerLink="/stats" routerLinkActive="active">Statistiques</a>
        <button
          type="button"
          class="theme-toggle"
          (click)="toggleTheme()"
          [attr.aria-label]="isDark() ? 'Activer le mode clair' : 'Activer le mode sombre'"
        >
          {{ isDark() ? '☀️' : '🌙' }}
        </button>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class App {
  // Mode sombre mémorisé dans le localStorage
  isDark = signal(localStorage.getItem('theme') === 'dark');

  constructor() {
    // Applique le thème au démarrage et à chaque changement
    effect(() => {
      const dark = this.isDark();
      document.body.classList.toggle('dark', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggleTheme() {
    this.isDark.update((d) => !d);
  }
}
