import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidades } from 'src/app/model/habilidades.model';
import { HabilidadesService } from 'src/app/servicio/habilidades.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  public habilidades: Habilidades[];
  public editHabilidades: Habilidades  | undefined;
  public deleteHabilidades: Habilidades | undefined;

  constructor(private habilidadesService: HabilidadesService) { }

  ngOnInit() {
    this.getAllHabilidades();
  }
  public getAllHabilidades(): void {
    this.habilidadesService.getAllHabilidades().subscribe({
      next: (response: Habilidades[]) => {
        this.habilidades = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public onAddHabilidades(addForm: NgForm):void {
    document.getElementById('add-habilidades-modal')?.click();
    this.habilidadesService.addHabilidades(addForm.value).subscribe({
      next: (response: Habilidades) => {
        console.log(response);
        this.getAllHabilidades();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
  });
    
  }

  public onUpdateHabilidades(habilidades: Habilidades):void {
      this.habilidadesService.updateHabilidades(habilidades).subscribe({
      next: (response: Habilidades) => {
        console.log(response);
        this.getAllHabilidades();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  });
    
  }

  public onDeleteHabilidades(id: number):void {
    this.habilidadesService.deleteHabilidades(id).subscribe({
    next: (response: void) => {
      console.log(response);
      this.getAllHabilidades(); 
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  });
  
  }
  public onOpenModal(habilidades: Habilidades, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addHabilidadesModal');
    }
    if (mode === 'edit') {
      this.editHabilidades = habilidades;
      button.setAttribute('data-target', '#updateHabilidadesModal');
    }
    if (mode === 'delete') {
      this.deleteHabilidades = habilidades;
      button.setAttribute('data-target', '#deleteHabilidadesModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
