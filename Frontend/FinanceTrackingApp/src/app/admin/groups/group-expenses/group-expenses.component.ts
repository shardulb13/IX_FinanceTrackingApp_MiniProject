import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from 'src/core/services/expense.service';
import { GroupsService } from 'src/core/services/groups.service';

@Component({
  selector: 'app-group-expenses',
  templateUrl: './group-expenses.component.html',
  styleUrls: ['./group-expenses.component.scss']
})
export class GroupExpensesComponent implements OnInit {
  allGroups:any=[];
  groupExpenses:any=[];
  isVisible:boolean=false;
  id!:any;
  constructor(private groupService: GroupsService, private expenseService: ExpenseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(res =>{
      console.log(res);
      this.allGroups = res;
      console.log("All groups", this.allGroups);
    }); 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("Got id", this.id);

    this.expenseService.getExpensebyGroup(this.id).subscribe(res =>{
      this.groupExpenses = res;
      console.log("Group Expense", this.groupExpenses);
    });

  }

  showTable(){
    this.isVisible = !this.isVisible;
  }
}
