import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, map, observable, Observable, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private tokenservice: TokenService, private loaderService: LoaderService, private toastrService: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    const token = this.tokenservice.getToken();
    if (token && token !== '') {
      const tokenreq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(tokenreq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          this.toastrService.error(error.error.message);
          return throwError(error);
        }),
        finalize(
          () => {
            this.loaderService.isLoading.next(false);
          }
        )
      )
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message);
        return throwError(error);
      }),
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    );
  }
}
