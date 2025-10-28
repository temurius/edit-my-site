import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  kind: ToastKind;
  title: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class UiService {
  private readonly loadingSignal = signal(false);
  private readonly toastsSignal = signal<ToastMessage[]>([]);

  readonly loading = this.loadingSignal.asReadonly();
  readonly toasts = this.toastsSignal.asReadonly();

  setLoading(isLoading: boolean): void {
    queueMicrotask(() => this.loadingSignal.set(isLoading));
  }

  addToast(kind: ToastKind, message: string, title = 'Notification', timeout = 3500): void {
    const toast: ToastMessage = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      kind,
      title,
      message
    };

    this.toastsSignal.update(list => [...list, toast]);

    setTimeout(() => this.dismissToast(toast.id), timeout);
  }

  dismissToast(id: number): void {
    this.toastsSignal.update(list => list.filter(toast => toast.id !== id));
  }
}
