import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/features/admin/services/logout.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private readonly router: Router,
		private readonly logoutService: LogoutService
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			tap({
				error: (error) => {
					if (error instanceof HttpErrorResponse) {
						if (error.status === 401) {
							this.logoutService.logOut();
							this.router.navigate(['/admin/login']);
							return error;
						}
						return null;
					}
					return null;
				},
			})
		);
	}
}