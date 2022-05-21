import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/servicio/experiencia.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  public experiencias: Experiencia[];
  public editExperiencia: Experiencia;
  public deleteExperiencia: Experiencia;

  constructor(private experienciaService: ExperienciaService) { }

  ngOnInit() {
    this.getAllExperiencia();
  }
  public getAllExperiencia(): void {
    this.experienciaService.getAllExperiencia().subscribe({
      next: (response: Experiencia[]) => {
        this.experiencias = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public onAddExperiencia(addForm: NgForm):void {
    document.getElementById('add-experiencia-modal')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.getAllExperiencia();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
  });
    
  }

  public onUpdateExperiencia(persona: Experiencia):void {
      this.experienciaService.updateExperiencia(persona).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.getAllExperiencia();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  });
    
  }

  public onDeleteExperiencia(id: number):void {
    this.experienciaService.deleteExperiencia(id).subscribe({
    next: (response: void) => {
      console.log(response);
      this.getAllExperiencia(); 
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  });
  
  }
}

