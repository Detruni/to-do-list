import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
          >Tâches</a
        >
        <a routerLink="/stats" routerLinkActive="active">Statistiques</a>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class App {}
