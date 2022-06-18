import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Habilidades } from "../model/habilidades.model";

@Injectable({
    providedIn: 'root'
  })
  export class HabilidadesService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }

  public getAllHabilidades(): Observable<Habilidades[]> {
    return this.http.get<Habilidades[]>(`${this.apiServerUrl}/habilidades/all`);
  }
  public getHabilidadesById(idHabilidades: number):Observable<Habilidades> {
    return this.http.get<Habilidades>(this.apiServerUrl + `habilidades/add${idHabilidades}`)
  }

  public updateHabilidades(habilidades: Habilidades): Observable<Habilidades> {
    return this.http.put<Habilidades>(`${this.apiServerUrl}/habilidades/update`, habilidades);
  } 

  public addHabilidades(habilidades: Habilidades): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/habilidades/add`, habilidades);
  }

  public deleteHabilidades(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/habilidades/delete/${id}`);
  }
}