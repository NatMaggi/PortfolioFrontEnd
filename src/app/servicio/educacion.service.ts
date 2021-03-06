import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Educacion } from "../model/educacion.model";

@Injectable({
  providedIn: 'root'
  
  })
  export class EducacionService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }

  public getAllEducacion(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/educacion/all`);
  }
  public getEducacionById(idEducacion: number):Observable<Educacion> {
    return this.http.get<Educacion>(this.apiServerUrl + `educación/add${idEducacion}`)
  }

  public updateEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(`${this.apiServerUrl}/educacion/update`, educacion);
  } 

  public addEducacion(educacion: Educacion): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/educacion/add`, educacion);
  }

  public deleteEducacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/educacion/delete/${id}`);
  }
}