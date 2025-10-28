import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AiEditRequest {
  prompt: string;
  htmlContext: string;
}

export interface AiEditResponse {
  before: string;
  after: string;
}

export interface PullRequestResponse {
  status: 'ok' | 'error';
  prUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private readonly http = inject(HttpClient);

  /**
   * Calls the mock AI backend to request an edit suggestion. Returns the HTML "before" and "after".
   */
  generateEdit(body: AiEditRequest): Observable<AiEditResponse> {
    return this.http.post<AiEditResponse>('/api/edit', body);
  }

  /**
   * Requests a mock pull request to be created. Returns the resulting PR URL.
   */
  createPullRequest(body: AiEditRequest): Observable<PullRequestResponse> {
    return this.http.post<PullRequestResponse>('/api/pull-request', body);
  }
}
