import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>({ id: '1', name: 'Demo Admin', email: 'admin@example.com' });

  get user(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  login(email: string, password: string): Observable<User> {
    const user = { id: '1', name: 'Demo Admin', email };
    this.currentUser$.next(user);
    return of(user);
  }

  logout(): void {
    this.currentUser$.next(null);
  }
}

