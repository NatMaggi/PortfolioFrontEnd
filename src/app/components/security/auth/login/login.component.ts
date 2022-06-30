import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../../entity/userLogin';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  userLogin: UserLogin;
  userName: string;
  password: string;
  roles: string[] = [];
  errorMessage: string


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.userLogin = new UserLogin(this.userName, this.password);
    this.authService.login(this.userLogin).subscribe({
      next: (data) => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        console.log(err);
        /*this.errorMessage = err.error.message;
        console.log(err.error.message);*/
      }
    })
  }

}