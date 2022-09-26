import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-group-expenses',
  templateUrl: './group-expenses.component.html',
  styleUrls: ['./group-expenses.component.scss']
})
export class GroupExpensesComponent implements OnInit {
  pageNo = 1;
  allGroups:any=[];
  groupExpenses:any=[];
  id!:any;
  loggedInUser:any;
  result=0;
  oweTemp=0;
  settleTemp=0;
  oweAmount=0;
  settleAmount=0;
  arrayofowe:any=[];
  arrayofSettle:any=[];
  showOweAmount:any=[];
  showSettleAmount:any=[];


  constructor(private groupService: GroupsService, private expenseService: ExpenseService, private activatedRoute: ActivatedRoute, private authService: AuthenticationService,
    private toastrService: ToastrService, private route: Router) { }

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

      this.authService.getCurrentUserDetails().subscribe(res =>{
        this.loggedInUser = res;
        console.log("Logged in User", this.loggedInUser);
        
            for(let i =0; i<= this.groupExpenses.length; i++){
              if(this.groupExpenses[i].paidBy.toLowerCase() == this.loggedInUser.userName.toLowerCase()){
                let tempResult =  this.groupExpenses[i].amount/ (this.groupExpenses[i].userId.length);
                this.result += Math.round(tempResult);
                console.log("Usernames matched");
                this.oweTemp = (this.groupExpenses[i].amount)/this.groupExpenses[i].userId.length ;
                this.oweAmount += Math.round(this.oweTemp)* (this.groupExpenses[i].userId.length-1);
                console.log("Denyache Paise", this.oweAmount);
                this.arrayofowe = this.groupExpenses[i].userId;
                console.log("Mala"+ this.arrayofowe +"Amount"+this.oweAmount);
                console.log("Array of owe amount", this.arrayofowe);  
      
                for(let j = 0; j< this.arrayofowe.length; j++){
                  if(this.arrayofowe[j].toLowerCase() != this.loggedInUser.userName.toLowerCase()){
                    this.showOweAmount.push({'userName':this.arrayofowe[j],'amount':Math.round(this.oweTemp), 'ExpenseName':this.groupExpenses[i].expenseName});
                    console.log("Unmatched id", this.arrayofowe[j] + "owes me" + this.oweTemp);
                    console.log("Array madhe kiti ahe", this.showOweAmount);
                    console.log(this.showOweAmount.userName + "owes me" + this.showOweAmount.amount);
                  }
                    console.log("Found Matching ids in the array");
                 }
              }
              else{
                this.settleTemp = (this.groupExpenses[i].amount)/ this.groupExpenses[i].userId.length;
                this.settleAmount += Math.round(this.settleTemp);
                console.log("Mala deyache paise", this.settleAmount);
                this.arrayofSettle = this.groupExpenses[i].userId;
                console.log("Mala"+ this.arrayofSettle +"Amount"+this.settleAmount);
                console.log("Array of owe amount", this.settleAmount);  
                for(let j = 0; j< this.arrayofSettle.length; j++){
                   if(this.groupExpenses[i].paidBy == this.arrayofSettle[j]){
                    this.showSettleAmount.push({'userName':this.arrayofSettle[j],'amount':Math.round(this.settleTemp), 'ExpenseName':this.groupExpenses[i].expenseName});
                    console.log("Unmatched id", this.arrayofowe[j] + "owes me" + this.settleTemp);
                    console.log("Array madhe kiti ahe", this.showOweAmount);
                    console.log(this.showSettleAmount.userName + "owes me" + this.showSettleAmount.amount);
                    console.log("unmatched user id");
                  }
                 }
              }
            }
      
      });
    });
  }

  deleteGroupExpense(id:number){
    this.expenseService.DeleteExpense(id).subscribe(res=>{
      this.toastrService.error("Expense Deleted Successfully");
      window.location.reload();
    }, 
    err=>{
      this.toastrService.warning("Error in deleting expense");
    });
  }

  editExpense(id:number){
      this.route.navigate([`user/allexpenses/edit/${id}`]);
  }
}
