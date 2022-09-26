import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private groupService: GroupsService, private expenseService:ExpenseService) { }

  ngOnInit(): void {
    // this.expenseService.getExpensebyGroup().subscribe(res=>{

    // })
  }

}
