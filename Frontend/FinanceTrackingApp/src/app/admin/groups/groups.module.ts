import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupExpensesComponent } from './group-expenses/group-expenses.component';


@NgModule({
  declarations: [
    GroupsComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    DashboardComponent,
    GroupExpensesComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class GroupsModule { }
