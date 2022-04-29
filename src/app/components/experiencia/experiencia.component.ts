import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicio/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  educacionList:any;
  experienciaList:any;

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.educacionList=data.educacion;
      this.experienciaList=data.experiencia;
  })

}
}
