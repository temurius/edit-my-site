import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Braces, MousePointerClick, Sparkles } from 'lucide-angular/icons';
import { FloatingEditorComponent } from './floating-editor.component';

interface EditorSection {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-editor-widget',
  standalone: true,
  imports: [CommonModule, FloatingEditorComponent, LucideAngularModule.pick({ Braces, MousePointerClick, Sparkles })],
  template: `
    <div class="relative min-h-screen overflow-hidden bg-slate-950 pb-32 pt-20 text-white">
      <div class="pointer-events-none absolute inset-0 bg-mesh-gradient opacity-70 blur-3xl"></div>
      <div class="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <header class="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
          <div class="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.3em] text-white/60">
            <lucide-icon name="sparkles" class="h-4 w-4 text-brand-emerald"></lucide-icon>
            <span>Visual editor</span>
          </div>
          <h1 class="text-4xl font-semibold">Live widget editor</h1>
          <p class="max-w-2xl text-base leading-relaxed text-white/70">
            Hover any element to preview how the AI understands the DOM tree. Use the floating widget to describe your change and
            instantly preview diffs before opening a pull request.
          </p>
        </header>

        <section class="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div class="space-y-6">
            <div class="glass-panel relative overflow-hidden rounded-3xl p-10">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-indigo/10 via-transparent to-brand-emerald/10"></div>
              <div class="relative space-y-6">
                <div
                  class="rounded-2xl border border-white/10 bg-white/5 p-6 transition"
                  *ngFor="let section of sections()"
                  (mouseenter)="setActive(section.id)"
                  (mouseleave)="setActive(null)"
                  [class.ring-4]="activeSection() === section.id"
                  [class.ring-brand-emerald]="activeSection() === section.id"
                  [class.shadow-glow]="activeSection() === section.id"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-xs uppercase tracking-[0.35em] text-white/60">{{ section.id }}</p>
                      <h3 class="mt-3 text-2xl font-semibold">{{ section.title }}</h3>
                    </div>
                    <lucide-icon name="mouse-pointer-click" class="h-6 w-6 text-white/60"></lucide-icon>
                  </div>
                  <p class="mt-4 text-sm leading-relaxed text-white/70">{{ section.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <aside class="space-y-6">
            <div class="glass-panel rounded-3xl p-8">
              <div class="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/60">
                <lucide-icon name="braces" class="h-4 w-4"></lucide-icon>
                <span>DOM context</span>
              </div>
              <p class="mt-4 text-sm leading-relaxed text-white/70">
                The widget sends the highlighted HTML context so the AI can understand the structure and semantic intent of the
                element you are editing.
              </p>
              <pre class="mt-6 overflow-x-auto rounded-2xl bg-slate-900/90 p-4 text-xs leading-relaxed text-emerald-200">
{{ htmlContext }}
              </pre>
            </div>
          </aside>
        </section>
      </div>

      <app-floating-editor class="fixed bottom-10 right-10 z-40" [htmlContext]="htmlContext"></app-floating-editor>
    </div>
  `
})
export class EditorWidgetComponent {
  readonly htmlContext = `
<section class="hero">
  <h1 class="text-4xl font-bold">Ship updates instantly</h1>
  <p class="mt-3 max-w-xl text-lg text-slate-300">Collaborate with Edit-My-Site AI to launch beautiful updates without waiting on the next deployment cycle.</p>
  <button class="mt-6 rounded-full bg-brand-emerald px-6 py-3 font-semibold text-slate-900">Start editing</button>
</section>
<section class="feature-grid">
  <article class="rounded-3xl bg-slate-900/70 p-6">
    <h2 class="text-2xl font-semibold text-white">Reusable components</h2>
    <p class="mt-2 text-sm text-slate-400">Every component is tracked and previewed so the AI keeps design and content consistent.</p>
  </article>
</section>`;

  private readonly activeSectionSignal = signal<string | null>(null);

  readonly sections = signal<EditorSection[]>([
    {
      id: 'hero',
      title: 'Hero headline & CTA',
      description: 'Primary hero block with marketing headline, supporting copy, and gradient call-to-action button.'
    },
    {
      id: 'feature-grid',
      title: 'Feature grid',
      description: 'Cards summarising the reusable component library and guard rails enforced by the AI editor.'
    }
  ]);

  readonly activeSection = computed(() => this.activeSectionSignal());

  setActive(sectionId: string | null): void {
    this.activeSectionSignal.set(sectionId);
  }
}
