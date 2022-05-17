import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { experiencia } from "../model/experiencia.model";


@Injectable({
    providedIn: 'root'
  })
  export class ExperienciaService {
    URL = 'http://localhost:8080/experiencia'
  
    constructor(private http: HttpClient) { }

  public getAllExperiencia(): Observable<experiencia> {
    return this.http.get<experiencia>('/experiencia/all');
  }

  public updateExperiencia(Experiencia: experiencia): Observable<experiencia> {
    return this.http.put<experiencia>('/experiencia/update', Experiencia);
  } 

  public addExperiencia(Experiencia: experiencia): Observable<experiencia> {
    return this.http.post<experiencia>('/experiencia/add', Experiencia);
  }

  public deleteExperiencia(id: number): Observable<void> {
    return this.http.delete<void>('/experiencia/delete');
  }
}