import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/servicio/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  public educaciones: Educacion[];
  public editEducacion: Educacion;
  public deleteEducacion: Educacion;

  constructor(private educacionService: EducacionService) { }

  ngOnInit() {
    this.getAllEducacion();
  }
  public getAllEducacion(): void {
    this.educacionService.getAllEducacion().subscribe({
      next: (response: Educacion[]) => {
        this.educaciones = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public onAddEducacion(addForm: NgForm):void {
    document.getElementById('add-educacion-modal')?.click();
    this.educacionService.addEducacion(addForm.value).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getAllEducacion();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
  });
    
  }

  public onUpdateEducacion(educacion: Educacion):void {
      this.educacionService.updateEducacion(educacion).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getAllEducacion();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  });
    
  }

  public onDeleteEducacion(id: number):void {
    this.educacionService.deleteEducacion(id).subscribe({
    next: (response: void) => {
      console.log(response);
      this.getAllEducacion(); 
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  });
  
  }
}