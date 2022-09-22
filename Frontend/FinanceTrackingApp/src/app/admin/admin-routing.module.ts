import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendsComponent } from './friends/friends.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'', component:AdminComponent, children:[
      {
        path: 'allexpenses',
        loadChildren: () => import('./all-expenses/all-expenses.module').then(m => m.AllExpensesModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
      },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path:'friends',
        loadChildren:()=> import('./friends/friends.module').then(m=>m.FriendsModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
