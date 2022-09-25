import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { ExpenseService } from 'src/core/services/expense.service';
import { GroupsService } from 'src/core/services/groups.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  expform!: any;
  editdata: any = [];
  allUsers: any = [];
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
      userId: new FormControl('')
    });

    this.authService.getAllUsers().subscribe(res => {
      console.log("All users", res)
      this.allUsers = res;
    });

    this.expenseService.getAllExpenses().subscribe(res => {
      this.editdata = res;
      console.log("Edit Expense", this.editdata);
      for (let i = 0; i < this.editdata.length; i++) {
        if (this.id == this.editdata[i].expensesId) {
          this.expform.controls.ExpensesId.setValue(this.editdata[i].expensesId);
          this.expform.controls.ExpenseName.setValue(this.editdata[i].expenseName);
          this.expform.controls.ExpenseDate.setValue(this.editdata[i].expenseDate);
          this.expform.controls.Amount.setValue(this.editdata[i].amount);
          this.expform.controls.PaidBy.setValue(this.editdata[i].paidBy);
          this.expform.controls.userId.setValue(this.editdata[i].userId);
          console.log("expense Date", this.editdata[i].expenseDate);
          
          this.selectedlist = this.editdata[i].userId;
          console.log("selectedlist", this.selectedlist);
          console.log("kai value yetiye hyat", this.editdata[i].userId);
          this.paidByList = this.editdata[i].userId;
          console.log("abc", this.paidByList);
        }
      }
    });

    this.groupService.getGroups().subscribe(res => {
      this.groupData = res;
      console.log("GroupDetails", this.groupData);
      for (let j = 0; j < this.groupData.length; j++) {
        this.expenseService.getExpensebyGroup(this.groupData[j].id).subscribe(res => {
          this.groupDetails = res;
          for (let i = 0; i < this.groupDetails.length; i++) {
            if (this.groupData[j].id == this.groupDetails[i].groupId) {
              if (this.id == this.groupDetails[i].expensesId) {
                this.expform.controls.ExpensesId.setValue(this.groupDetails[i].expensesId);
                this.expform.controls.ExpenseName.setValue(this.groupDetails[i].expenseName);
                this.expform.controls.ExpenseDate.setValue(this.groupDetails[i].expenseDate);
                this.expform.controls.Amount.setValue(this.groupDetails[i].amount);
                this.expform.controls.PaidBy.setValue(this.groupDetails[i].paidBy);
                this.expform.controls.GroupId.setValue(this.groupDetails[i].groupId);
                console.log("group date", this.groupDetails[i].expenseDate);
              }
            }
          }
        })

      }
    });

    this.groupService.getGroups().subscribe(res => {
      this.usersGroup = res;
      console.log("Users Group", this.usersGroup);

    })

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

  onchange() {
    if (this.expform.controls['GroupId'].value > 0) {
      for (let i = 0; i < this.usersGroup.length; i++) {
        if (this.usersGroup[i].id == this.expform.controls['GroupId'].value) {
          for (let j = 0; j < this.usersGroup[i].userId.length; j++) {
            for (let k = 0; k < this.allUsers.length; k++) {
              let matchingUserName = this.usersGroup[i].userId.filter((x: any) => x == this.allUsers[k].userName);
              console.log("Abc madhe ky ala", matchingUserName);
              if (this.allUsers[k].userName == matchingUserName) {
                console.log("Matching Username", matchingUserName);
                this.paidByList.push({
                  'id': this.allUsers[k].id,
                  'userName': this.allUsers[k].userName
                });
                console.log("PaidBylist madhe ky ala", this.paidByList);
              }
            }
            break;
          }
        }
      }
    }
  }
}
