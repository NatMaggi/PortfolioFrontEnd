import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/model/persona.model';

import { PortfolioService } from 'src/app/servicio/portfolio.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  public personas: Persona[];
  public editPersona: Persona;
  public deletePersona: Persona;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.getPersonas();
       }
  public getPersonas(): void {
    this.portfolioService.getAllPersonas().subscribe({
      next: (response:Persona[]) => {
        this.personas = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  });
  }
  public onAddPersona(addForm: NgForm):void {
    document.getElementById('add-persona-modal')?.click();
    this.portfolioService.addPersona(addForm.value).subscribe({
      next: (response: Persona) => {
        console.log(response);
        this.getPersonas();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
  });
    
  }

  public onUpdatePersona(persona: Persona):void {
      this.portfolioService.updatePersona(persona).subscribe({
      next: (response: Persona) => {
        console.log(response);
        this.getPersonas();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  });
    
  }

  public onDeletePersona(id: number):void {
    this.portfolioService.deletePersona(id).subscribe({
    next: (response: void) => {
      console.log(response);
      this.getPersonas(); 
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  });
  
  }
}

