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
  lentTemp=0;
  oweAmount:number = 0;
  lentAmount:number =0;
  absoluteShowLentAmount = 0;
  arrayofowe:any=[];
  arrayoflent:any=[];
  showLentAmount:any=[];
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
          this.result += this.allExpense[i].amount/ (this.allExpense[i].userId.length);
          console.log("Usernames matched");
          this.temp = (this.allExpense[i].amount)/this.allExpense[i].userId.length ;
          this.oweAmount += Math.floor(this.temp)* (this.allExpense[i].userId.length-1);
          console.log("Denyache Paise", this.oweAmount);
          this.arrayofowe = this.allExpense[i].userId;
          console.log("Mala"+ this.arrayofowe +"Amount"+this.oweAmount);
          console.log("Array of owe amount", this.arrayofowe);  

          for(let j = 0; j< this.arrayofowe.length; j++){
            if(this.arrayofowe[j].toLowerCase() != this.currentUser.userName.toLowerCase()){
              this.showOweAmount.push({'userName':this.arrayofowe[j],'amount':Math.floor(this.temp), 'ExpenseName':this.allExpense[i].expenseName});
              console.log("Unmatched id", this.arrayofowe[j] + "owes me" + this.temp);
              console.log("Array madhe kiti ahe", this.showOweAmount);
              console.log(this.showOweAmount.userName + "owes me" + this.showOweAmount.amount);
            }
              console.log("Found Matching ids in the array");
           }
        }
        else{
          this.lentTemp = (this.allExpense[i].amount)/ this.allExpense[i].userId.length;
          this.lentAmount += Math.floor(this.lentTemp);
          console.log("Mala deyache paise", this.lentAmount);
          this.arrayoflent = this.allExpense[i].userId;
          console.log("Mala"+ this.arrayoflent +"Amount"+this.lentAmount);
          console.log("Array of owe amount", this.lentAmount);  
          for(let j = 0; j< this.arrayoflent.length; j++){
             if(this.allExpense[i].paidBy == this.arrayoflent[j]){
              this.showLentAmount.push({'userName':this.arrayoflent[j],'amount':Math.floor(this.lentTemp), 'ExpenseName':this.allExpense[i].expenseName});
              console.log("Unmatched id", this.arrayofowe[j] + "owes me" + this.lentTemp);
              console.log("Array madhe kiti ahe", this.showOweAmount);
              console.log(this.showLentAmount.userName + "owes me" + this.showLentAmount.amount);
              console.log("unmatched user id");
            }
           }
          
        }
        
      } 
      this.settle();

      });
    });


   this.authService.getAllUsers().subscribe(res=>{
    this.allUsers = res;
    console.log("Username",this.allUsers[0].userName.toLowerCase());
  });



  }

  settle(){
    for(let i = 0; i< this.showOweAmount.length; i++){
      console.log("showoweamount:", this.showOweAmount[i]);
      for(let j=0; j< this.showLentAmount.length; j++){
        console.log("showlent", this.showLentAmount[j]);
        if(this.showLentAmount[j].userName == this.showOweAmount[i].userName){
          console.log("same username");
          this.lentAmount -=  Math.abs(this.showLentAmount[j].amount);
          this.absoluteShowLentAmount =  Math.abs(this.showLentAmount[j].amount) - Math.abs(this.showOweAmount[i].amount);
          if(Math.abs(this.absoluteShowLentAmount) >= 0 ){
            this.showLentAmount[j].amount = Math.abs(this.absoluteShowLentAmount);
            console.log("final lent amount:", this.showLentAmount[j].amount);
          }
          this.showLentAmount[j].amount = 0;
          this.lentAmount += this.showLentAmount[j].amount;
          
           this.oweAmount = Math.abs(this.absoluteShowLentAmount);
           this.showOweAmount[i].amount = Math.abs(this.absoluteShowLentAmount);
          // console.log(this.lentAmount);
          this.result += this.lentAmount;
        }
      }
      break;
     }

  }
  
}
