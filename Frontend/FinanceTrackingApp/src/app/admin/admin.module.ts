import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
