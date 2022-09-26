import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pageNo = 1;
  expenses: any =[];
  allUsers:any =[];
  allGroups:any=[];
  constructor(private expenseService: ExpenseService, private authService: AuthenticationService, private route: Router, private toastrService: ToastrService,
    private groupService: GroupsService) { }

  ngOnInit(): void {
    this.expenseService.getAllExpenses().subscribe(res => {
      console.log(res);
      this.expenses = res;
      console.log("All Expenses",this.expenses);
    });

    this.authService.getAllUsers().subscribe(res=>{
      this.allUsers = res;
      console.log("All users", this.allUsers);
    });

    this.groupService.getGroups().subscribe(res =>{
      console.log(res);
      this.allGroups = res;
      console.log("All groups", this.allGroups);
    }); 
  }

  getNames(){
    for(var i =0; i<this.expenses.length; i++){
      for(var j=0; j<this.allUsers.length;j++){
        if(this.allUsers[j].id == this.expenses[i].userId){
          console.log("IDs matched");
          console.log(this.allUsers[j].userName);
        }
      }
    }
  }

  deleteExpense(id:number){
    this.expenseService.DeleteExpense(id).subscribe(res=>{
      // alert("Expense Deleted Successfully");
      this.toastrService.error("Expense Deleted Successfully");
      this.ngOnInit();
    },
    err=>{
      // alert("Error in deleting Expense")
      this.toastrService.error("Error in deleting Expense");
    })
  }
  edit(id:number){
    this.route.navigate([`user/allexpenses/edit/${id}`]);
  }

  getGroupExpense(){
    for(let i=0;i<this.allGroups.length; i++){
      console.log("Group Expense id", this.allGroups[i].id);
      this.expenseService.getExpensebyGroup(this.allGroups[i].id).subscribe(res =>{
        console.log("Group Expenses", res);
      });
    }
  }
}
