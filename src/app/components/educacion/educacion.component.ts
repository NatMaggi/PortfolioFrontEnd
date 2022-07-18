import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion.model';
import { AuthService } from 'src/app/servicio/auth.service';
import { EducacionService } from 'src/app/servicio/educacion.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  public educacion: Educacion[];
  public editEducacion: Educacion | undefined;
  public deleteEducacion: Educacion | undefined;
  public isUserLogged: Boolean = false;

  constructor(private educacionService: EducacionService,
    private authService: AuthService) {}

    ngOnInit(): any {
      this.isUserLogged = this.authService.isUserLogged();
      this.getAllEducacion();
    }

  public getAllEducacion(): void {
    this.educacionService.getAllEducacion().subscribe({
      next: (response: Educacion[]) => {
        this.educacion = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public onAddEducacion(addForm: NgForm):void {
    document.getElementById('add-educacion-modal').click();
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
  
  public onOpenModal(educacion: Educacion, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducacionModal');
    }
    if (mode === 'edit') {
      this.editEducacion = educacion;
      button.setAttribute('data-target', '#updateEducacionModal');
    }
    if (mode === 'delete') {
      this.deleteEducacion = educacion;
      button.setAttribute('data-target', '#deleteEducacionModal');
    }
    container?.appendChild(button);
    button.click();
  }
}