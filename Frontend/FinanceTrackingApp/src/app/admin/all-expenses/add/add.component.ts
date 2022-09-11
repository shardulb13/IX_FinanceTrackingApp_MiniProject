import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { ExpenseService } from 'src/core/services/expense.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  expform!:any;
  currentUserDetails!:any;
  allUsers:any=[];
  list:any=[];
  selectedlist:any=[];
  checkedList : any=[];
  currentSelected :any= {};
  showDropDown!:boolean;
  // dropdownSettings:IDropdownSettings = {};
  paidby:any;
  useridarray:any=[];
  formarr:any= [];
  constructor(private authService: AuthenticationService, private expenseService: ExpenseService, private router: Router) {}
  
  ngOnInit(): void {
    this.expform = new FormGroup({
      ExpenseName : new FormControl('', [Validators.required]),
      ExpenseDate : new FormControl('', [Validators.required]),   
      Amount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      PaidBy: new FormControl('',[Validators.required]),
      IsActive: new FormControl(true),
      UserId: new FormControl(this.checkedList)
    });       

    this.authService.getCurrentUserDetails().subscribe(res =>{
      this.currentUserDetails = res;
      console.log(res);
    });

    this.authService.getAllUsers().subscribe(res =>{
      console.log("All users",res)
      this.allUsers = res;
    });
  }

  get form(){
    return this.expform.controls;
  }

  addExpense(){
    this.expenseService.AddExpenses(this.expform.value).subscribe(res =>{
    console.log(res);
    alert("Expense Added Successfully");
    this.router.navigate(['admin/allexpenses']);

    },
    err=>{
      alert("Something went wrong");
    });
    console.log("Form Details",this.expform.value);
    console.log(this.checkedList);
  }

  getSelectedValue(status:Boolean,value:String, id:string){
    if(status){
      this.checkedList.push(id);
      this.selectedlist.push(value);  
      console.log("CheckedList",this.checkedList);
    }else{
        var index = this.checkedList.indexOf(value);
        var index1 = this.selectedlist.indexOf(value);
        this.checkedList.splice(index,1);
        this.selectedlist.splice(index1,1);
    }
    // this.currentSelected = {checked : status,name:value};
  }
  default(){
    for(let i =0; i<this.allUsers.length; i++){
      if(this.currentUserDetails.id == this.allUsers[i].id){
        this.checkedList.push(this.allUsers[i].id);
        console.log("Added id", this.checkedList);
      }
    }
  }

  mouseleavefunc(e:any){
    this.showDropDown = false;
    console.log("mouse enter");
  }
}
