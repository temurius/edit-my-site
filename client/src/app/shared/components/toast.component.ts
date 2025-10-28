import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-angular/icons';
import { ToastMessage } from '../../core/services/ui.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgFor, NgClass, LucideAngularModule.pick({ CheckCircle2, AlertTriangle, Info, X })],
  template: `
    <div class="pointer-events-none fixed bottom-6 right-6 z-50 flex w-80 flex-col gap-3">
      <div
        *ngFor="let toast of toasts"
        class="pointer-events-auto overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 p-4 shadow-xl backdrop-blur"
        [ngClass]="{
          'border-emerald-400/60': toast.kind === 'success',
          'border-amber-400/60': toast.kind === 'info',
          'border-rose-400/60': toast.kind === 'error'
        }"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl"
            [ngClass]="{
              'bg-emerald-500/20 text-emerald-300': toast.kind === 'success',
              'bg-amber-500/20 text-amber-300': toast.kind === 'info',
              'bg-rose-500/20 text-rose-300': toast.kind === 'error'
            }"
          >
            <lucide-icon
              [name]="toast.kind === 'success' ? 'check-circle-2' : toast.kind === 'error' ? 'alert-triangle' : 'info'"
              class="h-5 w-5"
            ></lucide-icon>
          </div>
          <div class="flex-1 space-y-1">
            <p class="text-sm font-semibold text-white">{{ toast.title }}</p>
            <p class="text-sm text-slate-300">{{ toast.message }}</p>
          </div>
          <button
            type="button"
            class="rounded-full bg-white/5 p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
            (click)="dismiss.emit(toast.id)"
          >
            <lucide-icon name="x" class="h-4 w-4"></lucide-icon>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ToastComponent {
  @Input({ required: true }) toasts: ToastMessage[] = [];
  @Output() readonly dismiss = new EventEmitter<number>();
}
