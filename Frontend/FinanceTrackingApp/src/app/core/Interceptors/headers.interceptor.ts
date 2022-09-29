import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private tokenservice: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenservice.getToken();
    if(token && token !== '')
    {
      const tokenreq = request.clone({
        headers:request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(tokenreq)
    }
    return next.handle(request);
  }
}
