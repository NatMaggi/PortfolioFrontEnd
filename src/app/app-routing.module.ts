import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/security/auth/login/login.component';
import { PortfolioComponent } from './components/security/portfolio/portfolio.component';

const routes: Routes = [
  {path:'', component:PortfolioComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
