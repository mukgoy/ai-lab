import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from 'src/app/auth/services/user.service';
import { HelperService } from '../services/helper.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
         @Inject(PLATFORM_ID) public platformId: Object,
        private userService: UserService,
        // public help: HelperService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        
    }
}