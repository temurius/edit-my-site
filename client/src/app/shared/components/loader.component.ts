import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="visible" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 backdrop-blur-sm">
      <div class="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 shadow-glow">
        <span class="h-12 w-12 animate-spin rounded-full border-4 border-brand-emerald border-t-transparent"></span>
      </div>
    </div>
  `
})
export class LoaderComponent {
  @Input({ required: true }) visible!: boolean;
}
