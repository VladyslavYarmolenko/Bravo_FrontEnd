import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return next.handle(req);
    }

    const interceptedReq = req.clone({
      headers: req.headers.set('Authorization', accessToken)
    });

    return next.handle(interceptedReq);
  }
}
