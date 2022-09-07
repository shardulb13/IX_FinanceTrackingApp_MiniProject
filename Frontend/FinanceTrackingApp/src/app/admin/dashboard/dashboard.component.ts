import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { ExpenseService } from 'src/core/services/expense.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser:any;
  allExpense:any=[];
  allUsers: any=[];
  result=0;
  OweAmount = 0;
  
  constructor(private authService: AuthenticationService, private expService: ExpenseService ) {}

  ngOnInit(): void {
    this.expService.getAllExpenses().subscribe(res => {
      this.allExpense = res;
      console.log("All Expenses Filtered", this.allExpense);
      this.authService.getCurrentUserDetails().subscribe(res =>{
        this.currentUser = res;
       
      for(let i =0; i<= this.allExpense.length; i++){
        this.result += this.allExpense[i].amount;
      }
      });
   });

   this.authService.getAllUsers().subscribe(res=>{
    this.allUsers = res;
    console.log("Username",this.allUsers[0].userName.toLowerCase());
    console.log("all user to lower", this.allUsers.userName.toLowerCase());
  })

  }



  paidby(){
    for(var i=0; i<this.allExpense.length; i++){
        if(this.allExpense[i].paidBy.toLowerCase() == this.currentUser.userName.toLowerCase()){
          console.log("Usernames matched");
          this.OweAmount = this.OweAmount + this.allExpense[i].amount/this.allExpense[i].userId.length;
          console.log("Denyache Paise", this.OweAmount);
        }
    }
  }
}
