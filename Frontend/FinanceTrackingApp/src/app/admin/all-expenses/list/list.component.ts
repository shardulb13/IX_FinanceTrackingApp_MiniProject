import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { ExpenseService } from 'src/core/services/expense.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  expenses: any =[];
  allUsers:any =[];
  constructor(private expenseService: ExpenseService, private authService: AuthenticationService, private route: Router) { }

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
      alert("Expense Deleted Successfully");
      this.ngOnInit();
    },
    err=>{
      alert("Error in deleting Expense")
    })
  }
  edit(id:number){
    this.route.navigate([`admin/allexpenses/edit/${id}`]);
  }
}
