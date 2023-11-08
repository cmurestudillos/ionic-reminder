import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token'); // Obtén el token del localStorage

    if (token) {
      // Clona la solicitud original y agrega el token al encabezado 'x-auth-token'
      const cloned = req.clone({
        setHeaders: {
          'x-auth-token': token,
        },
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
