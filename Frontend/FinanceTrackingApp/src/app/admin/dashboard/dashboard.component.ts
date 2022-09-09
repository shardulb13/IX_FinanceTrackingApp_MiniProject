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
  oweAmount:number = 0;
  lentAmount:number =0;
  breakdownAmt:number=0;
  arrayofowe:any=[];
  paidBy!:any;
  
  constructor(private authService: AuthenticationService, private expService: ExpenseService ) {}

  ngOnInit(): void {
    this.expService.getAllExpenses().subscribe(res => {
      this.allExpense = res;
      console.log("All Expenses Filtered", this.allExpense);
      
      this.authService.getCurrentUserDetails().subscribe(res =>{
        this.currentUser = res;
       
      for(let i =0; i<= this.allExpense.length; i++){
        if(this.allExpense[i].paidBy == this.currentUser.userName){
          this.result += this.allExpense[i].amount;
        }
        if(this.allExpense[i].paidBy == this.currentUser.userName){
          console.log("Usernames matched");
          let temp = (this.oweAmount + this.allExpense[i].amount)/this.allExpense[i].userId.length * (this.allExpense[i].userId.length-1);
          this.oweAmount = Math.floor(temp);
          console.log("Denyache Paise", this.oweAmount);
        }
        else if(this.allExpense[i].paidBy != this.currentUser.UserName){
          let lentTemp = (this.allExpense[i].amount)/ this.allExpense[i].userId.length;
          this.lentAmount += Math.floor(lentTemp);
          console.log("Mala deyache paise", this.lentAmount);
        }
      }
   
      });
   });

   this.authService.getAllUsers().subscribe(res=>{
    this.allUsers = res;
    console.log("Username",this.allUsers[0].userName.toLowerCase());
    console.log("all user to lower", this.allUsers.userName.toLowerCase());
  })

  }



  // paidby(){
  //   for(var i=0; i<this.allExpense.length; i++){
  //       if(this.allExpense[i].paidBy.toLowerCase() == this.currentUser.userName.toLowerCase()){
  //         console.log("Usernames matched");
  //         let temp = (this.oweAmount + this.allExpense[i].amount)/this.allExpense[i].userId.length * (this.allExpense[i].userId.length-1);
  //         this.oweAmount = Math.floor(temp);
  //         console.log("Denyache Paise", this.oweAmount);
  //       }
  //       else{
  //         let lentTemp = (this.lentAmount + this.allExpense[i].amount)/ this.allExpense[i].userId.length;
  //         this.lentAmount = Math.floor(lentTemp);
  //         console.log("Mala deyache paise", this.lentAmount);
  //       }
  //   }
  // }

  getpaidbyId(){
    for(var i=0; i<this.allExpense.length; i++){
      this.paidBy = this.allExpense[i].paidBy;
      console.log("Got the paidby id", this.paidBy);
    }
  }
  checkname(){
    for(var i=0; i<this.allExpense.length; i++){
        if(this.paidBy== this.allExpense[i].userId){
          let tempbreakdownamt = this.allExpense[i].amount/this.allExpense[i].userId.length;
          this.breakdownAmt = tempbreakdownamt;
          this.arrayofowe.push(this.allExpense[i].userName + this.breakdownAmt);
          console.log("Array madhe store kela", this.arrayofowe);
          console.log("Mala tula evdhe deyache ahet" + this.allExpense[i].userName + this.breakdownAmt );
        }

      }
    }
  
}
