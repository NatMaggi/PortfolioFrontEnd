import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Proyectos } from "../model/proyectos.model";

@Injectable({
    providedIn: 'root'
  })
  export class ProyectosService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }

  public getAllProyectos(): Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/proyectos/all`);
  }

  public updateProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.put<Proyectos>(`${this.apiServerUrl}/proyectos/update`, proyectos);
  } 

  public addProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.post<Proyectos>(`${this.apiServerUrl}/proyectos/add`, proyectos);
  }

  public deleteProyectos(proyectosId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/proyectos/delete/${proyectosId}`);
  }
}