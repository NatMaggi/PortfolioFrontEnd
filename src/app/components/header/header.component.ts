import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../security/entity/userLogin';
import { AuthService } from '../security/service/auth.service';
import { TokenService } from '../security/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  userLogin: UserLogin;
  userName: string;
  password: string;
  roles: string[] = [];
  errorMessage: string
  

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else {
      this.isLogged = false;
    }

    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
    
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
    
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
        window.location.reload();
      },
      error: (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMessage = err.error.error;
        console.log(err.error.error);
        

      }
    })
  }

}