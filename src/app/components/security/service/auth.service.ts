import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtDTO } from "../entity/jwt-dto";
import { NewUser } from "../entity/newUser";
import { UserLogin } from "../entity/userLogin";


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    authURL = 'http://localhost:8080/auth/';
  
    constructor(private httpClient: HttpClient) { }
  
    public nuevo(newUser: NewUser): Observable<any> {
      return this.httpClient.post<any>(this.authURL + 'nuevo', newUser);
    }
  
    public login(userLogin: UserLogin): Observable<JwtDTO> {
      return this.httpClient.post<JwtDTO>(this.authURL + 'login', userLogin);
    }
  }