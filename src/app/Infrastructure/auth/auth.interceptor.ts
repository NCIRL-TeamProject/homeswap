import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    // tslint:disable-next-line:typedef
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();

        if (accessToken) {
            req = req.clone({
                //I am using x-access-token for simplicity, once login is working we could change it
                headers: req.headers.set("x-access-token", accessToken)
                // setHeaders: {
                //     Authorization: 'JWT $[accessToken}'
                // }
            });
        }

        return next.handle(req);
    }
}