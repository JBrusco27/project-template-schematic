import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../../../shared/models';
import { constants } from '../../../shared/api.constants';
import { UtilsService, httpOptions } from '../../../shared/utils/app.utils';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private http: HttpClient,
        private utilsService: UtilsService
    ) { }

    async getUsers(
        filter: string = '',
        sort: string = 'asc',
        sortColumn: string = 'id_usuario',
        pageNumber: number = 0,
        pageSize: number = 10
    ): Promise<User[]> {
        return await firstValueFrom(this.http
            .get<User[]>(constants.API_USER, {
                params: new HttpParams()
                    .set('filter', filter)
                    .set('sort', sort)
                    .set('sortColumn', sortColumn)
                    .set('pageNumber', pageNumber.toString())
                    .set('pageSize', pageSize.toString()),
            })
            .pipe(
                map((result: any) => result.paginatedUsers),
                catchError(this.utilsService.handleError<User[]>(constants.API_USER, []))
            ));
    }

    async getUserSelect(): Promise<User[]> {
        return await firstValueFrom(this.http.get<User[]>(constants.API_USER + '/select').pipe(
            map((result: any) => result.selectUser),
            catchError(this.utilsService.handleError<User[]>(constants.API_USER, []))
        ));
    }

    async getUser(id: number): Promise<User> {
        const url = `${constants.API_USER}/${id}`;
        return await firstValueFrom(this.http.get<User>(url).pipe(
            map((result: any) => result.data[0]),
            tap((_) => this.utilsService.log(`fetched User id=${id}`)),
            catchError(this.utilsService.handleError<User>(`getUser id=${id}`))
        ));
    }

    async updateUser(user: User): Promise<any> {
        return await firstValueFrom(this.http.put(constants.API_USER + '/' + user.id_usuario, user, httpOptions).pipe(
            tap((_) => this.utilsService.log(`updated User id=${user.id_usuario}`)),
            catchError(this.utilsService.handleError<any>('updateUser'))
        ));
    }

    async createUser(user: User): Promise<User> {
        return await firstValueFrom(this.http.post<User>(constants.API_USER, user, httpOptions)
        .pipe(
            tap((newUser: User) => this.utilsService.log(`added User w/ id=${newUser.id_usuario}`)),
            catchError(this.utilsService.handleError<User>('addUser'))
        ));
    }

    async deleteUser(user: User | number): Promise<User> {
        const id = typeof user === 'number' ? user : user.id_usuario;
        const url = `${constants.API_USER}/${id}`;

        return await firstValueFrom(this.http.delete<User>(url, httpOptions).pipe(
            tap((_) => this.utilsService.log(`deleted User id=${id}`)),
            catchError(this.utilsService.handleError<User>('deleteUser'))
        ));
    }

    async updateStatusUser(user: User): Promise<any> {
        return await firstValueFrom(this.http.patch(constants.API_USER_STATUS_UPDATE + '/' + user.id_usuario, httpOptions).pipe(
            tap((_) => this.utilsService.log(`updated status for User id=${user.id_usuario}`)),
            catchError(this.utilsService.handleError<any>('updateStatusUser'))
        ));
    }

    async verifyNewUserEmail(email: string) {
        return await firstValueFrom(this.http.get<boolean>(constants.API_VERIFY_NEW_USER_EMAIL + '/' + email)
            .pipe(
                tap((res: any) => this.utilsService.log(`Email verify result: ${res}`)),
                catchError(this.utilsService.handleError<any>('verifyNewUserEmail'))
            ));
    }
}
