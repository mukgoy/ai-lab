import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { adminApi } from '../../admin/enums';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private userService: UserService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.userService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.access_token;
        const isApiUrl = request.url.startsWith(adminApi.backend);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}