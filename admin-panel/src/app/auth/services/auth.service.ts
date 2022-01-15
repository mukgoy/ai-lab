import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { authApi } from '../enums';
import { ApiHttpService } from './api-http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http : ApiHttpService,
    public userService : UserService,
  ) { }

  postUserLogin(form:any){
    // console.log(form);
    const url = authApi.auth.login;
    const body = {
      "username": form.username,
      "password": form.password
    };
    return this.http.post(url, body).pipe(
      tap((response:any)=>{
        console.log(response);
        const { access_token } = response;
        if (access_token && access_token.length) {
          this.userService.login(response);
          return true;
        } else {
          throw new Error('no token')
        }
      })
    );
  }


  
  postUserSignup(form:any){
    // console.log(form);
    const url = authApi.auth.login;
    const body = {
      "username": form.username,
      "password": form.password
    };
    return this.http.post(url, body).pipe(
      tap((response:any)=>{
        console.log(response);
        const { access_token } = response;
        if (access_token && access_token.length) {
          this.userService.login(response);
          return true;
        } else {
          throw new Error('no token')
        }
      })
    );
  }
  
}
