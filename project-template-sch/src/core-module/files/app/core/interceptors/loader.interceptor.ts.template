import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    totalRequests = 0;
    completedRequests = 0;

    constructor(@Inject(LoaderService) private loaderService: LoaderService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loaderService.show();
        this.totalRequests++;
        return next.handle(request).pipe(
            finalize(() => {
                this.completedRequests++;
                if (this.totalRequests === this.completedRequests) {
                    this.loaderService.hide();
                    this.completedRequests = 0;
                    this.totalRequests = 0;
                }
            })
        );
    }
}