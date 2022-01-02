import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    username: [""],
    password: [""]
  });
  formSubmited: boolean = false;
  queryParams: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.queryParams = params);
  }

  login() {
    this.formSubmited = true;
    if (this.myForm.status == 'VALID') {
      this.authService.postUserLogin(this.myForm.value)
        .subscribe((response: any) => {
          console.log("login");
          if (this.queryParams.returnUrl) {
            this.router.navigateByUrl(this.queryParams.returnUrl);
          } else {
            this.router.navigateByUrl("/admin");
          }
          
        }, (error: any) => {
          console.log("error", error);
        });
    }
  };

}
