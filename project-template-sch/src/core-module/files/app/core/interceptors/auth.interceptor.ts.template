import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { LoginService } from 'src/app/features/admin/services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(@Inject(LoginService) private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.loginService.getAccessToken();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        });
        return next.handle(authReq);
    }
}
