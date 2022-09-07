import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    LandingpageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomePageModule { }
