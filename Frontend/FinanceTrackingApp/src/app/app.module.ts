import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { HeadersInterceptor } from 'src/core/Interceptors/headers.interceptor';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgSelectModule,
    // NgMultiSelectDropDownModule.forRoot()
    ToastrModule.forRoot({
      timeOut:1000,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:HeadersInterceptor , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
