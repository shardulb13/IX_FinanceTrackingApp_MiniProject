import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { ExpenseService } from 'src/core/services/expense.service';
import { GroupsService } from 'src/core/services/groups.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  expform!:any;
  currentUserDetails!:any;
  allUsers:any=[];
  selectedlist:any=[];
  checkedList : any=[];
  showDropDown!:boolean;
  paidby:any;
  useridarray:any=[];
  formarr:any= [];
  date! :string;
  usersGroup:any=[];
  paidBylist:any=[];
  isdisable = false;
  constructor(private authService: AuthenticationService, private expenseService: ExpenseService, private router: Router, private toastrService: ToastrService,
    private groupService: GroupsService) {}
  
  ngOnInit(): void {
    this.expform = new FormGroup({
      ExpenseName : new FormControl('', [Validators.required]),
      ExpenseDate : new FormControl('', [Validators.required]),   
      Amount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      PaidBy: new FormControl('',[Validators.required]),
      GroupId: new FormControl(null),
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
    
    this.date = new Date().toISOString().slice(0,10);
    console.log(this.date);
    
    this.groupService.getGroups().subscribe(res=>{
      this.usersGroup = res;
      console.log("Users Group", this.usersGroup);
    })
  }

  get form(){
    return this.expform.controls;
  }

  addExpense(){
    // this.expenseService.AddExpenses(this.expform.value).subscribe(res =>{
    // console.log(res);
    // this.toastrService.success("Expenes Added Successfully");
    // if(this.expform.controls['GroupId'].value != null){
    //   this.router.navigate(['user/groups']);
    // }
    // this.router.navigate(['user/allexpenses']);
    // },
    // err=>{
    //   this.toastrService.error("Something went wrong");
    // });
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
    // if(this.selectedlist.length > 1)
    // {
    //   this.isdisable = true;
    //   console.log("True false: 0"+ this.isdisable)
    // }
  }
  // default(){
  //   for(let i =0; i<this.allUsers.length; i++){
  //     if(this.currentUserDetails.id == this.allUsers[i].id){
  //       this.checkedList.push(this.allUsers[i].id);
  //       console.log("Added id", this.checkedList);
  //     }
  //   }
  // }

  mouseleavefunc(e:any){
    this.showDropDown = false;
    console.log("mouse enter");
  }

  onchange(event:any){
    if(this.expform.controls['GroupId'].value > 0){
      for(let i=0; i<this.usersGroup.length; i++){
        if(this.usersGroup[i].id == this.expform.controls['GroupId'].value){
          for(let j=0; j<this.usersGroup[i].userId.length; j++){
            for(let k=0; k<this.allUsers.length; k++){
              let matchingUserName = this.usersGroup[i].userId.filter((x: any) => x == this.allUsers[k].userName);
              console.log("Abc madhe ky ala", matchingUserName);
              if(this.allUsers[k].userName == matchingUserName){
                console.log("Matching Username", matchingUserName);
                this.paidBylist.push({
                      'id':this.allUsers[k].id,
                      'userName':this.allUsers[k].userName
                    });
                console.log("PaidBylist madhe ky ala", this.paidBylist);
              }
          
          }
          break;
            // console.log(tempUserGroupIds);
            // if(this.allUsers[k].userName == tempUserGroupIds[k]){
            //   console.log("UserNames Matched");
            //   console.log("EmptyList", this.paidBylist);
            //   this.paidBylist.push({
            //     'id':this.allUsers[k].id,
            //     'userName':this.allUsers[k].userName
            //   });
            //   console.log("Id", this.paidBylist);
            // }
          }
        }
      }
    }    
  }
}
