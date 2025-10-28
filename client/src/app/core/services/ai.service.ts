import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

export interface DiffChunk {
  file: string;
  patch: string; // unified diff patch
}

export interface DiffResult {
  beforeHtml: string;
  afterHtml: string;
  diff: DiffChunk[];
  summary: string;
}

@Injectable()
export class AiService {
  constructor(private http: HttpClient) {}

  // Mocked initial implementation
  generateEdit(prompt: string, contextHtml: string): Observable<DiffResult> {
    const mock: DiffResult = {
      beforeHtml: contextHtml,
      afterHtml: contextHtml.replace('</h1>', ' <span class="text-primary-600">(Edited)</span></h1>'),
      diff: [
        {
          file: 'index.html',
          patch: `--- a/index.html\n+++ b/index.html\n@@\n- <h1>Hello</h1>\n+ <h1>Hello <span class=\"text-primary-600\">(Edited)</span></h1>`
        }
      ],
      summary: `Applied edit: ${prompt}`
    };
    return of(mock).pipe(delay(500));
  }

  createPullRequest(diff: DiffResult): Observable<{ url: string; number: number }> {
    // Wire to backend stub
    return this.http.post<{ url: string; number: number }>(`/api/pull-request`, diff);
  }
}

