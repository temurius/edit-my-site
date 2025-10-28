import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Loader2, Mic, Send, Sparkles, Wand2, X } from 'lucide-angular/icons';
import { HighlightModule } from 'ngx-highlightjs';
import { finalize } from 'rxjs/operators';
import gsap from 'gsap';
import { AiService, AiEditResponse } from '../../core/services/ai.service';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-floating-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightModule, LucideAngularModule.pick({ Loader2, Mic, Send, Sparkles, Wand2, X })],
  template: `
    <div #container class="relative">
      <button
        #button
        type="button"
        class="flex items-center gap-3 rounded-full bg-gradient-to-r from-brand-indigo to-brand-emerald px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-inner-glow focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
        (click)="toggleOpen()"
      >
        <lucide-icon name="sparkles" class="h-5 w-5"></lucide-icon>
        <span>{{ open() ? 'Close editor' : 'Open editor assistant' }}</span>
      </button>

      <div
        #panel
        class="absolute bottom-16 right-0 w-[min(420px,90vw)] origin-bottom-right rounded-3xl bg-gradient-to-br from-brand-indigo/90 via-slate-900 to-brand-emerald/90 p-1"
        [class.pointer-events-none]="!panelInteractive()"
      >
        <div class="relative rounded-[28px] bg-slate-950/95 p-6 text-white shadow-2xl">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.35em] text-white/50">AI editor</p>
              <h3 class="mt-1 text-lg font-semibold">Describe your change</h3>
            </div>
            <button type="button" class="rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20" (click)="closePanel()">
              <lucide-icon name="x" class="h-4 w-4"></lucide-icon>
            </button>
          </div>

          <div class="mt-6 space-y-4">
            <label class="block text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Prompt</label>
            <div class="relative">
              <textarea
                [(ngModel)]="prompt"
                rows="4"
                class="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder-white/40 focus:border-brand-emerald focus:outline-none focus:ring-2 focus:ring-brand-emerald/60"
                placeholder="Example: Make the hero headline punchier and turn the button into a gradient"
              ></textarea>
              <button
                type="button"
                class="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-emerald text-slate-950 shadow-lg transition hover:scale-105"
                (click)="submit()"
                [disabled]="isSubmitting()"
              >
                <lucide-icon *ngIf="!isSubmitting()" name="send" class="h-4 w-4"></lucide-icon>
                <lucide-icon *ngIf="isSubmitting()" name="loader-2" class="h-4 w-4 animate-spin"></lucide-icon>
              </button>
            </div>
            <div class="flex items-center justify-between text-xs text-white/60">
              <div class="flex items-center gap-2">
                <lucide-icon name="mic" class="h-4 w-4"></lucide-icon>
                <span>Voice commands coming soon</span>
              </div>
              <span>{{ prompt.length }}/240</span>
            </div>
          </div>

          <div *ngIf="diff() as preview" class="code-diff mt-6 space-y-5 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div class="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
              <lucide-icon name="wand-2" class="h-4 w-4 text-brand-emerald"></lucide-icon>
              <span>Diff preview</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <p class="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Before</p>
                <pre><code [highlight]="preview.before" [languages]="['xml']"></code></pre>
              </div>
              <div>
                <p class="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">After</p>
                <pre><code [highlight]="preview.after" [languages]="['xml']"></code></pre>
              </div>
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                class="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                (click)="createPullRequest()"
                [disabled]="isSubmitting()"
              >
                <span>Open Pull Request</span>
              </button>
              <button type="button" class="btn-ghost text-sm" (click)="resetPreview()">Clear preview</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FloatingEditorComponent implements AfterViewInit, OnDestroy {
  @Input() htmlContext = '';

  @ViewChild('panel', { static: false }) panel?: ElementRef<HTMLDivElement>;
  @ViewChild('button', { static: false }) button?: ElementRef<HTMLButtonElement>;

  protected prompt = '';
  protected readonly diff = signal<AiEditResponse | null>(null);
  private readonly openSignal = signal(false);
  private readonly panelInteractiveSignal = signal(false);
  protected readonly isSubmitting = signal(false);

  private readonly ai = inject(AiService);
  private readonly ui = inject(UiService);

  private panelTimeline?: gsap.core.Timeline;
  private glowTween?: gsap.core.Tween;

  readonly open = computed(() => this.openSignal());
  readonly panelInteractive = computed(() => this.panelInteractiveSignal());

  ngAfterViewInit(): void {
    if (this.panel) {
      gsap.set(this.panel.nativeElement, { autoAlpha: 0, y: 40, scale: 0.9 });
      this.panelTimeline = gsap
        .timeline({ paused: true })
        .to(this.panel.nativeElement, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out'
        })
        .eventCallback('onReverseComplete', () => {
          this.panelInteractiveSignal.set(false);
          this.openSignal.set(false);
          this.glowTween?.play();
        });
    }

    if (this.button) {
      this.glowTween = gsap.to(this.button.nativeElement, {
        boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: 'sine.inOut'
      });
    }
  }

  ngOnDestroy(): void {
    this.panelTimeline?.kill();
    this.glowTween?.kill();
  }

  toggleOpen(): void {
    if (!this.openSignal()) {
      this.panelInteractiveSignal.set(true);
      this.openSignal.set(true);
      this.panelTimeline?.play();
      this.glowTween?.pause();
    } else {
      this.panelTimeline?.reverse();
    }
  }

  closePanel(): void {
    if (this.openSignal()) {
      this.panelTimeline?.reverse();
    }
  }

  submit(): void {
    const trimmed = this.prompt.trim();
    if (!trimmed) {
      this.ui.addToast('info', 'Describe the update you would like to make first.', 'Add a prompt');
      return;
    }

    this.isSubmitting.set(true);
    this.ui.setLoading(true);

    this.ai
      .generateEdit({ prompt: trimmed.slice(0, 240), htmlContext: this.htmlContext })
      .pipe(
        finalize(() => {
          this.ui.setLoading(false);
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: response => {
          this.diff.set(response);
          this.ui.addToast('success', 'AI diff preview generated successfully.', 'Diff ready');
        },
        error: () => {
          this.ui.addToast('error', 'Unable to reach the AI service. Please try again.', 'Request failed');
        }
      });
  }

  resetPreview(): void {
    this.diff.set(null);
  }

  createPullRequest(): void {
    const trimmed = this.prompt.trim();
    if (!trimmed || !this.diff()) {
      this.ui.addToast('info', 'Generate a diff before opening a pull request.', 'No diff yet');
      return;
    }

    this.isSubmitting.set(true);
    this.ui.setLoading(true);
    this.ai
      .createPullRequest({ prompt: trimmed.slice(0, 240), htmlContext: this.htmlContext })
      .pipe(
        finalize(() => {
          this.ui.setLoading(false);
          this.isSubmitting.set(false);
        })
      )
      .subscribe({
        next: response => {
          if (response.status === 'ok' && response.prUrl) {
            this.ui.addToast('success', `Pull request ready: ${response.prUrl}`, 'PR created');
          } else {
            this.ui.addToast('error', 'The pull request could not be created.', 'PR failed');
          }
        },
        error: () => {
          this.ui.addToast('error', 'Unable to reach the pull request service.', 'PR failed');
        }
      });
  }
}
