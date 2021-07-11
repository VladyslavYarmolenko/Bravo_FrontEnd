import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { VerificationComponent } from './auth/verification/verification.component';
import { MainComponent } from './components/main/main.component';



const routes: Routes = [
  // {
  //   path: '', pathMatch: 'full',
  //   component: MainComponent,
  //   loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
  // },
  { path: 'login', component: LoginComponent },
  { path: 'verification', component: VerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
