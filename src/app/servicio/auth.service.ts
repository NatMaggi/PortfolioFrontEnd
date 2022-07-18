import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public login(credentials:Login) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.apiServerUrl}/login`, credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("user", "admin");
      })
    );
  }

  public logout() {
    sessionStorage.removeItem("user");
  }

  public isUserLogged():boolean {
    return sessionStorage.getItem("user") !== null;
  }
}