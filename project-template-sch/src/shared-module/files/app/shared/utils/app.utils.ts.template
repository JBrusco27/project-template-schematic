import { Inject, inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginService } from '../../features/admin/services/login.service';
import { LogoutService } from '../../features/admin/services/logout.service';

export const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	}),
};


@Injectable({ providedIn: 'root' })
export class UtilsService {

	constructor(
		@Inject(LogoutService) private logoutService: LogoutService
	) {}

	handleError<T>(operation = 'operation', result?: T): any {
		return (error: any): Observable<T> => {
			if ( error.status && error.status === 401 ) {
				this.logoutService.logOut();
			}
			return of(result as T);
		};
	}

	log(message: string): void {
		console.log(message);
	}

}
