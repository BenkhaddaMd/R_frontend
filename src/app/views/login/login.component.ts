import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllServicesService } from '../../all-services.service';
import { TokenService } from '../../token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 

  constructor(private myServ:AllServicesService,
              private tokenS:TokenService,
              private router:Router,
              private Auth:AuthService){}
  public user = {
    email: null,
    password: null
  }
  public error;
  onSubmit(){

     this.myServ.login(this.user).subscribe(
      data => this.handleLogin(data),
      error => this.handleError(error)
    );  
  }
  handleError(error){
    this.error = error.error.error;
  }
  handleLogin(data){
    this.tokenS.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    localStorage.setItem('email', btoa(this.user.email) );

    this.router.navigateByUrl("/home");
  }
}
