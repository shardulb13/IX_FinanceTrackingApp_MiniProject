import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { ExpenseService } from 'src/core/services/expense.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  expform!:any;
  editdata:any=[];
  allUsers:any=[];
  selectedlist:any=[];
  checkedList : any=[];
  currentSelected :any= {};
  showDropDown!:boolean;
  id!:any;
  constructor(private authService: AuthenticationService, private expenseService:ExpenseService,private activatedroute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.expform = new FormGroup({
      ExpensesId: new FormControl(''),
      ExpenseName : new FormControl(''),
      ExpenseDate : new FormControl(''),   
      Amount: new FormControl(''),
      PaidBy: new FormControl(''),
      IsActive: new FormControl(true),
      // UserId: new FormArray([this.checkedList]),
      // UserId: new FormControl(this.checkedList)
    });     
    this.authService.getAllUsers().subscribe(res =>{
      console.log("All users",res)
      this.allUsers = res;
    });

    this.expenseService.getAllExpenses().subscribe(res =>{
      this.editdata = res;
      console.log("Edit Expense", this.editdata);
      for(let i = 0; i<this.editdata.length;i++){
        if(this.id == this.editdata[i].expensesId){
          this.expform.controls.ExpensesId.setValue(this.editdata[i].expensesId);
          this.expform.controls.ExpenseName.setValue(this.editdata[i].expenseName);
          this.expform.controls.ExpenseDate.setValue(this.editdata[i].expenseDate);
          this.expform.controls.Amount.setValue(this.editdata[i].amount);
          this.expform.controls.PaidBy.setValue(this.editdata[i].paidBy);
         }
      }
    })

    this.id = this.activatedroute.snapshot.paramMap.get('id');
      console.log("got id:", this.id);
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
    this.currentSelected = {checked : status,name:value};
  }
  mouseleavefunc(e:any){
    this.showDropDown = false;
    console.log("mouse enter");
  }

  updateExpense(){
    this.expenseService.updateExpense(this.expform.value).subscribe(res=>{
      alert("Data Updated Successfully");
      this.route.navigate(['admin/allexpenses'])
    })
  }
}
