import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicio/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginError: Boolean = false;

  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder,
    private router: Router,
  ) {
    this.form = this.formBuilder.group(
      {
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
   }

  ngOnInit(): void {
  }

  onSubmit(event: Event) {
    event.preventDefault;

    this.authService.login(this.form.value).subscribe(
      (response: Boolean) => {
        if (response){
          this.router.navigate(['/']);
        }
        else {
          this.loginError = true;
        }
      }
    );
  }

}