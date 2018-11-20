import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from "./components/nav/nav.component";
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClassesComponent } from "./components/classes/classes.component";
import { SideBarPanelComponent } from './components/side-bar-panel/side-bar-panel.component';
import { ClassmatesComponent } from "./components/classmates/classmates.component";

// Firebase/AngularFire2
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

// Firebase Config
import { environment } from '../environments/environment';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { MaterialModule } from './material';

// Servies
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { UserService } from './services/user.service';
import { RequestsService } from './services/requests.service';
import { RequestsComponent } from './components/requests/requests.component';
import { AddedClassmatesComponent } from './components/added-classmates/added-classmates.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    LeftSideBarComponent,
    ProfileComponent,
    NavComponent,
    ClassesComponent,
    SideBarPanelComponent,
    ClassmatesComponent,
    RequestsComponent,
    AddedClassmatesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthguardService,
    UserService,
    RequestsService,
    SideBarPanelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
