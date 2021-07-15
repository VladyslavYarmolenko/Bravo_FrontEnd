import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { VerificationComponent } from './auth/verification/verification.component';
import { AppGuard } from './guard/app-guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/components/components.module').then(m => m.ComponentsModule), canActivate: [AppGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'verification', component: VerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
