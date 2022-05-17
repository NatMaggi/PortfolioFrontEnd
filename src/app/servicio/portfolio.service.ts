import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona.model';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiServeUrl = '';

  constructor(private http:HttpClient) { }
  
  public getAllPersona():Observable<Persona[]>{
    return this.http.get<Persona[]>('${this.apiServerUrl}/persona/all');
    
  }
  public addPersona(persona: Persona):Observable<Persona>{
    return this.http.post<Persona>('${this.apiServerUrl}/persona/add', persona);
    
  }
  public updatePersona(persona: Persona):Observable<Persona>{
    return this.http.put<Persona>('${this.apiServerUrl}/persona/update', persona);
    
  }
  public deletePersona(personaId: number):Observable<void>{
    return this.http.delete<void>('${this.apiServerUrl}/persona/delete/${personaId}');
    
  }
}
