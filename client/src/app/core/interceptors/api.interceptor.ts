import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Prefix API requests with BACKEND_URL if provided via global variable
    const backendUrl = (window as any)["BACKEND_URL"] || '';
    if (req.url.startsWith('/api') && backendUrl) {
      const cloned = req.clone({ url: backendUrl.replace(/\/$/, '') + req.url });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}

