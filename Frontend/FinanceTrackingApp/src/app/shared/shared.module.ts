import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageNavComponent } from './landing-page-nav/landing-page-nav.component';
import { ProfilePageNavComponent } from './profile-page-nav/profile-page-nav.component';



@NgModule({
  declarations: [
    LandingPageNavComponent,
    ProfilePageNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProfilePageNavComponent,
    LandingPageNavComponent
  ]
})
export class SharedModule { }
