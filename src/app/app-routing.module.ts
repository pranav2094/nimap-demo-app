import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [{ path: 'home', component: HomeComponent, pathMatch: 'full'},
{ path: 'profile', component: ProfileComponent },
// { path: 'payment', component: PaymentComponent,canActivate: [AuthGuard]},
{ path: '**', redirectTo: '/' }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
