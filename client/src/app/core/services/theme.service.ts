import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'edit-my-site-theme';
  private readonly document = inject(DOCUMENT);

  private readonly themeSignal = signal<ThemeMode>(this.readInitialTheme());
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    this.applyThemeClass(this.theme());
  }

  toggle(): void {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setTheme(mode: ThemeMode): void {
    this.themeSignal.set(mode);
    this.applyThemeClass(mode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.storageKey, mode);
    }
  }

  private applyThemeClass(mode: ThemeMode): void {
    const root = this.document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.style.setProperty('color-scheme', mode);
  }

  private readInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const stored = window.localStorage.getItem(this.storageKey) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
