import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
};


@Injectable({ providedIn: 'root' })
export class UtilsService {

    constructor() { }

    handleError<T>(operation = 'operation', result?: T): any {
        return (error: any): Observable<T> => {
            if (error.status && error.status === 401) {
                // this.loginService.logOut();
            }
            return of(result as T);
        };
    }

    log(message: string): void {
        console.log(message);
    }

}
