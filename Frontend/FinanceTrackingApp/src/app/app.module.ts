import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeadersInterceptor } from 'src/core/Interceptors/headers.interceptor';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


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
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:HeadersInterceptor , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
