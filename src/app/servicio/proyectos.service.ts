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
  public getProyectosById(idProyectos: number):Observable<Proyectos> {
    return this.http.get<Proyectos>(this.apiServerUrl + `proyectos/add${idProyectos}`)
  }
  public updateProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.put<Proyectos>(`${this.apiServerUrl}/proyectos/update`, proyectos);
  } 

  public addProyectos(proyectos: Proyectos): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/proyectos/add`, proyectos);
  }

  public deleteProyectos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/proyectos/delete/${id}`);
  }
}