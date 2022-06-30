import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/security/auth/login/login.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { PortfolioComponent } from './components/security/portfolio/portfolio.component';
import { InterceptProvider, PortInterceptorService } from './components/security/interceptors/portfolio-interceptor.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AcercaComponent,
    ExperienciaComponent,
    ProyectosComponent,
    HeaderComponent,
    HabilidadesComponent,
    EducacionComponent,
    PortfolioComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:PortInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
