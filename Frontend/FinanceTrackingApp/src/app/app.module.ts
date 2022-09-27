import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { HeadersInterceptor } from 'src/app/core/Interceptors/headers.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:2000,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    NgxPaginationModule
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:HeadersInterceptor , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
