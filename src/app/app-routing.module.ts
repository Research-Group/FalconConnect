import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthguardService } from './services/authguard.service';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardService] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }