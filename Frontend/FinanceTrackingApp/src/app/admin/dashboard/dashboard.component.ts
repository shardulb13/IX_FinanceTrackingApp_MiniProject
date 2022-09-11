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
  temp=0;
  oweAmount:number = 0;
  lentAmount:number =0;
  arrayofowe:any=[];
  showOweAmount:any=[];
  
  constructor(private authService: AuthenticationService, private expService: ExpenseService ) {}

  ngOnInit(): void {
    this.expService.getAllExpenses().subscribe(res => {
      this.allExpense = res;
      console.log("All Expenses Filtered", this.allExpense);
      
      this.authService.getCurrentUserDetails().subscribe(res =>{
        this.currentUser = res;
       
      for(let i =0; i<= this.allExpense.length; i++){
        if(this.allExpense[i].paidBy.toLowerCase() == this.currentUser.userName.toLowerCase()){
          this.result += this.allExpense[i].amount;
          console.log("Usernames matched");
          this.temp = (this.allExpense[i].amount)/this.allExpense[i].userId.length ;
          this.oweAmount += Math.floor(this.temp)* (this.allExpense[i].userId.length-1);
          console.log("Denyache Paise", this.oweAmount);
          this.arrayofowe = this.allExpense[i].userId;
          console.log("Mala"+ this.arrayofowe +"Amount"+this.oweAmount);
          console.log("Array of owe amount", this.arrayofowe);  

          for(let j = 0; j< this.arrayofowe.length; j++){
            if(this.arrayofowe[j].toLowerCase() == this.currentUser.userName.toLowerCase()){
              console.log("Found Matching ids in the array");
            }
            else{
              this.showOweAmount.push({'userName':this.arrayofowe[j],'amount':Math.floor(this.temp), 'ExpenseName':this.allExpense[i].expenseName});
              // this.showOweAmount.push();
              console.log("Unmatched id", this.arrayofowe[j] + "owes me" + this.temp);
              console.log("Array madhe kiti ahe", this.showOweAmount);
              console.log(this.showOweAmount.userName + "owes me" + this.showOweAmount.amount);
            }
           }
        }
        
        else{
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
  });


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
   for(let i = 0; i< this.arrayofowe.length; i++){
    if(this.arrayofowe[i] == this.currentUser.id){
      console.log("Found Matching ids in the array");
    }
    else{
      console.log("Unmatched id", this.arrayofowe[i] + "owes me" + this.oweAmount);
    }
   }
  }
  
}
