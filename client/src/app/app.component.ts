import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Github, Menu, Moon, Sparkles, Sun } from 'lucide-angular/icons';
import { ThemeService } from './core/services/theme.service';
import { LoaderComponent } from './shared/components/loader.component';
import { ToastComponent } from './shared/components/toast.component';
import { UiService } from './core/services/ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoaderComponent,
    ToastComponent,
    LucideAngularModule.pick({ Github, Menu, Moon, Sparkles, Sun })
  ],
  template: `
    <div class="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 ease-out dark:bg-slate-950 dark:text-slate-100">
      <header class="sticky top-0 z-40 border-b border-slate-200/10 bg-slate-950/80 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a routerLink="/" class="flex items-center gap-3 text-white">
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <lucide-icon name="sparkles" class="h-5 w-5 text-brand-emerald"></lucide-icon>
            </div>
            <div class="text-left">
              <p class="text-xs uppercase tracking-[0.35em] text-white/60">Edit-My-Site</p>
              <span class="text-lg font-semibold">AI Dashboard</span>
            </div>
          </a>
          <nav class="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
            <a
              routerLink="/"
              routerLinkActive="text-white"
              class="transition hover:text-white"
              [routerLinkActiveOptions]="{ exact: true }"
              >Dashboard</a
            >
            <a routerLink="/editor" routerLinkActive="text-white" class="transition hover:text-white">Editor</a>
            <a
              href="https://github.com/mock/pr/123"
              target="_blank"
              rel="noreferrer"
              class="flex items-center gap-2 text-white/60 transition hover:text-white"
            >
              <lucide-icon name="github" class="h-4 w-4"></lucide-icon>
              GitHub
            </a>
          </nav>
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
              (click)="toggleTheme()"
            >
              <lucide-icon *ngIf="theme() === 'light'" name="moon" class="h-5 w-5"></lucide-icon>
              <lucide-icon *ngIf="theme() === 'dark'" name="sun" class="h-5 w-5"></lucide-icon>
            </button>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              <lucide-icon name="menu" class="h-5 w-5"></lucide-icon>
            </button>
          </div>
        </div>
      </header>

      <main class="relative min-h-[calc(100vh-64px)]">
        <router-outlet></router-outlet>
      </main>

      <app-loader [visible]="ui.loading()"></app-loader>
      <app-toast [toasts]="ui.toasts()" (dismiss)="ui.dismissToast($event)"></app-toast>
    </div>
  `
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);
  readonly ui = inject(UiService);

  readonly theme = this.themeService.theme;

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
