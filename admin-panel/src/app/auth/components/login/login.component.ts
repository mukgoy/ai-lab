import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HelperService, UserService } from 'src/app/shared/services';
import { authNotify } from '../../enums';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user: SocialUser = <SocialUser>{};
  myForm: FormGroup = this.fb.group({
    username: ["",[Validators.required, Validators.email]],
    password: ["",[Validators.required]]
  });
  formSubmited: boolean = false;
  queryParams: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public userService: UserService,
    private help: HelperService,
    private socialAuthService: SocialAuthService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => this.queryParams = params);
    let obj = this.socialAuthService.authState.subscribe((user) => {
      if(user){
        this.user = user;
        this.signInBySocial(user)
        obj.unsubscribe();
        this.socialAuthService.signOut();
      }
    });
  }

  login() {
    this.formSubmited = true;
    if (this.myForm.status == 'VALID') {
      this.authService.postUserLogin(this.myForm.value)
        .subscribe((response: any) => {
          console.log("login");
          this.help.notify('success', authNotify.success.login);
          if (this.queryParams.returnUrl) {
            this.router.navigateByUrl(this.queryParams.returnUrl);
          } else {
            this.router.navigateByUrl("/admin");
          }
        }, (error: any) => {
          console.log("error", error);
          this.help.notify('error', error.error.message);
        });
    }
  };

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signInBySocial(user:any){
    console.log(user)
    // let url = javaHost + javaApis.auth.addUpdateUser
    // this.http.post(url, userdata).subscribe((res:any)=>{
    //   let user = res.response;
    //   let userdata:any = {
    //     id: user.id,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.userEmailColl[0]?.email,
    //     phone: user.userPhoneColl[0]?.phone,
    //     orgId: user.orgId,
    //     token: user.jwtToken,
    //   }
    //   let url = javaHost + javaApis.auth.getUserPermissions
    //   this.http.postform(url, {userId: userdata.id}).subscribe((res:any)=>{
    //     userdata.role = res.response.roleName
    //     userdata.permissions = res.response.functanilityCode
    //     this.userService.setUser(userdata);
    //     this.router.navigateByUrl(this.queryParams.returnUrl);
    //   });
    // });
  }
}
