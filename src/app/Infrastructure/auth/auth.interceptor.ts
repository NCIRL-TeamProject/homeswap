import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { InterceptorSkipHeader } from '../BaseUrlInterceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    // tslint:disable-next-line:typedef
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.headers.has(InterceptorSkipHeader)) {
            // const headers = request.headers.delete(InterceptorSkipHeader);
            return next.handle(request);
        }

        const accessToken = this.authService.getAccessToken();

        if (accessToken) {
            request = request.clone({
                //I am using x-access-token for simplicity, once login is working we could change it
                headers: request.headers.set("x-access-token", accessToken)
                // setHeaders: {
                //     Authorization: 'JWT $[accessToken}'
                // }
            });
        }

        return next.handle(request);
    }
}