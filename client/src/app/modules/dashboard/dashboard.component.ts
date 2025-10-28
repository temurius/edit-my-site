import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ArrowRight, FolderGit2, LineChart, PanelsTopLeft, Sparkles } from 'lucide-angular/icons';

interface RepositoryCard {
  name: string;
  description: string;
  branch: string;
  status: 'synced' | 'pending';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule.pick({ ArrowRight, FolderGit2, LineChart, PanelsTopLeft, Sparkles })],
  template: `
    <div class="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div class="pointer-events-none absolute inset-0 bg-mesh-gradient opacity-70 blur-3xl"></div>
      <div class="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-14">
        <section class="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside class="glass-panel flex flex-col justify-between rounded-3xl p-8">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <lucide-icon name="sparkles" class="h-6 w-6 text-brand-emerald"></lucide-icon>
                </div>
                <div>
                  <p class="text-sm uppercase tracking-[0.35em] text-white/60">Edit-My-Site</p>
                  <h1 class="text-xl font-bold">AI Studio</h1>
                </div>
              </div>
              <p class="text-sm leading-relaxed text-white/70">
                Visually edit marketing sites, preview AI-generated diffs, and ship accessible pull requests with one click.
              </p>
            </div>
            <div class="space-y-4 text-sm text-white/60">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-indigo/20 text-brand-indigo">
                  <lucide-icon name="panels-top-left" class="h-5 w-5"></lucide-icon>
                </div>
                <div>
                  <p class="font-medium text-white">2 live repositories</p>
                  <p>Auto-synced every 15 minutes</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-emerald/20 text-brand-emerald">
                  <lucide-icon name="line-chart" class="h-5 w-5"></lucide-icon>
                </div>
                <div>
                  <p class="font-medium text-white">Smart diff previews</p>
                  <p>Powered by GPT-5 automations</p>
                </div>
              </div>
            </div>
          </aside>

          <section class="flex flex-col gap-8">
            <header class="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p class="text-sm uppercase tracking-[0.35em] text-white/60">Overview</p>
                <h2 class="text-3xl font-semibold">Connected repositories</h2>
              </div>
              <a routerLink="/editor" class="btn-primary w-full justify-center lg:w-auto">
                <span>Open Editor</span>
                <lucide-icon name="arrow-right" class="h-4 w-4"></lucide-icon>
              </a>
            </header>

            <div class="grid gap-6 md:grid-cols-2">
              <article
                *ngFor="let repo of repositories()"
                class="glass-panel group rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-xs uppercase tracking-[0.3em] text-white/60">{{ repo.status === 'synced' ? 'Synced' : 'Pending' }}</p>
                    <h3 class="mt-2 text-xl font-semibold">{{ repo.name }}</h3>
                  </div>
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-indigo/20 text-brand-indigo">
                    <lucide-icon name="folder-git-2" class="h-5 w-5"></lucide-icon>
                  </div>
                </div>
                <p class="mt-4 text-sm leading-relaxed text-white/70">{{ repo.description }}</p>
                <div class="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                  <span>Branch · {{ repo.branch }}</span>
                  <span>{{ repo.status === 'synced' ? 'Up to date' : 'Awaiting sync' }}</span>
                </div>
              </article>
            </div>
          </section>
        </section>
      </div>
    </div>
  `
})
export class DashboardComponent {
  private readonly repoData = signal<RepositoryCard[]>([
    {
      name: 'marketing-site',
      description: 'Customer-facing marketing pages with landing experiments and hero sections.',
      branch: 'main',
      status: 'synced'
    },
    {
      name: 'docs-hub',
      description: 'Documentation portal including onboarding flows, changelog, and component library.',
      branch: 'develop',
      status: 'pending'
    }
  ]);

  readonly repositories = computed(() => this.repoData());
}
