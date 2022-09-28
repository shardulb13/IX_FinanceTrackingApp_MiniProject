import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  expform!: any;
  editdata: any = [];
  allUsers: any = [];
  tempAllUser: any = [];
  userName: any;
  selectedlist: any = [];
  checkedList: any = [];
  groupDetails: any = [];
  groupData: any = [];
  paidByList: any = [];
  currentSelected: any = {};
  showDropDown!: boolean;
  id!: any;
  date!: string;
  GroupId!: number;
  usersGroup: any = [];

  constructor(private authService: AuthenticationService, private expenseService: ExpenseService, private activatedroute: ActivatedRoute, private route: Router, private toastrService: ToastrService,
    private groupService: GroupsService) { }

  ngOnInit(): void {
    this.expform = new FormGroup({
      ExpensesId: new FormControl(''),
      ExpenseName: new FormControl('', [Validators.required]),
      ExpenseDate: new FormControl('', [Validators.required]),
      Amount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      PaidBy: new FormControl('', [Validators.required]),
      GroupId: new FormControl(null),
      IsActive: new FormControl(true),
      userId: new FormControl([])
    });

    this.expenseService.getAllExpenses().subscribe(res => {
      this.editdata = res;
      this.authService.getAllUsers().subscribe(res => {
        this.allUsers = res;
        // console.log("Edit Expense", this.editdata);
        for (let i = 0; i < this.editdata.length; i++) {
          if (this.id == this.editdata[i].expensesId) {
            this.expform.controls.ExpensesId.setValue(this.editdata[i].expensesId);
            this.expform.controls.ExpenseName.setValue(this.editdata[i].expenseName);
            this.expform.controls.ExpenseDate.setValue(this.editdata[i].expenseDate);
            this.expform.controls.Amount.setValue(this.editdata[i].amount);
            this.expform.controls.PaidBy.setValue(this.editdata[i].paidBy);
            this.expform.controls.userId.setValue(this.editdata[i].userId);
            for (let j = 0; j < this.allUsers.length; j++) {
              let matchingUserName = this.editdata[i].userId.filter((x: any) => x == this.allUsers[j].userName);
              if (matchingUserName == this.allUsers[j].userName) {
                this.paidByList.push({ 'id': this.allUsers[j].id, 'userName': this.allUsers[j].userName });
                console.log("PaidBy list", this.paidByList);
              }
            }
          }
        }
      });
    });

    this.groupService.getGroups().subscribe(res => {
      this.groupData = res;
      this.authService.getAllUsers().subscribe(res => {
        this.tempAllUser = res;
        for (let i = 0; i <= this.groupData.length; i++) {
          this.expenseService.getExpensebyGroup(this.groupData[i].id).subscribe(res => {
            this.groupDetails = res;
            for (let j = 0; j <= this.groupDetails.length; j++) {
              if (this.groupData[i].id == this.groupDetails[j].groupId) {
                if (this.id == this.groupDetails[j].expensesId) {
                  this.expform.controls.ExpensesId.setValue(this.groupDetails[j].expensesId);
                  this.expform.controls.ExpenseName.setValue(this.groupDetails[j].expenseName);
                  this.expform.controls.ExpenseDate.setValue(this.groupDetails[j].expenseDate);
                  this.expform.controls.Amount.setValue(this.groupDetails[j].amount);
                  this.expform.controls.PaidBy.setValue(this.groupDetails[j].paidBy);
                  this.expform.controls.GroupId.setValue(this.groupDetails[j].groupId);
                  for (let k = 0; k < this.tempAllUser.length; k++) {
                    let matchingUsers = this.groupDetails[j].userId.filter((x: any) => x == this.tempAllUser[k].userName);
                    if (matchingUsers == this.tempAllUser[k].userName) {
                      this.paidByList.push({ 'id': this.tempAllUser[k].id, 'userName': this.tempAllUser[k].userName });
                    }
                    console.log("paidBy", this.paidByList);
                  }
                }
              }
            }
          });
        }
      })
    });

    this.id = this.activatedroute.snapshot.paramMap.get('id');
    console.log("got id:", this.id);

    this.date = new Date().toISOString().slice(0, 10);
    console.log(this.date);
  }

  get form() {
    return this.expform.controls;
  }

  getSelectedValue() {
    for (let j = 0; j < this.selectedlist.length; j++) {
      let abc = this.allUsers.filter((x: any) => x.userName == this.selectedlist[j]);
      console.log("Abc madhe ky ala", abc);

    }
    //   this.checkedList.push(id);
    //   this.selectedlist.push(value);  
    //   console.log("CheckedList",this.checkedList);
    // }else{
    //     var index = this.checkedList.indexOf(value);
    //     var index1 = this.selectedlist.indexOf(value);
    //     this.checkedList.splice(index,1);
    //     this.selectedlist.splice(index1,1);
    // }
    // this.currentSelected = {checked : status,name:value};
  }
  mouseleavefunc(e: any) {
    this.showDropDown = false;
    console.log("mouse enter");
  }

  updateExpense() {
    this.expenseService.updateExpense(this.expform.value).subscribe(res => {
      // alert("Data Updated Successfully");
      this.toastrService.success("Expense Updated Successfully");
      if (this.expform.controls['GroupId'].value > 0) {
        this.route.navigate(['user/groups']);
      }
      else {
        this.route.navigate(['user/allexpenses'])
      }
    },
      err => {
        this.toastrService.error("Something went wrong");
      })
    console.log("Updated Data:", this.expform.value);
  }

}
