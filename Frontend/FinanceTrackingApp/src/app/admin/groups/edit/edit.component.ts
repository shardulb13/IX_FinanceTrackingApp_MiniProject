import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { FriendsService } from 'src/app/core/services/friends.service';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  groupForm: any;
  editGroup: any;
  editUserId: any;
  id!: any;
  checkedList: any = [];
  selectedlist: any = [];
  showDropDown!: boolean;
  friendList: any = [];
  allUsers: any = [];
  groups: any = [];
  loggedInUser: any;

  constructor(private groupService: GroupsService, private activatedRoute: ActivatedRoute, private tostrService: ToastrService, private route: Router,
    private friendService: FriendsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      id: new FormControl(''),
      groupName: new FormControl(''),
      userId: new FormControl(this.checkedList)
    });

    this.authService.getCurrentUserDetails().subscribe(res => {
      this.loggedInUser = res;
    });

    this.groupService.getGroups().subscribe(res => {
      this.editGroup = res;
      console.log("Edit Expense", this.editGroup);
      for (let i = 0; i < this.editGroup.length; i++) {
        if (this.id == this.editGroup[i].id) {
          this.groupForm.controls.id.setValue(this.editGroup[i].id);
          this.groupForm.controls.groupName.setValue(this.editGroup[i].groupName);
          this.editUserId = this.editGroup[i].userId;
          console.log("Edit madhe ala data", this.editUserId);
        }
      }
    });

    this.authService.getAllUsers().subscribe(res => {
      console.log("All users", res)
      this.allUsers = res;
      this.groupService.getGroups().subscribe(res => {
        console.log("Got the list of Friends", res[0].userId);
        this.groups = res;
        console.log("Group", this.groups);
        let tempFriendList = res[0].userId;
        for (let i = 0; i < this.allUsers.length; i++) {
          let matchingUserName = tempFriendList.filter((x: any) => x == this.allUsers[i].userName);
          console.log(matchingUserName);
          if (this.allUsers[i].userName != matchingUserName) {
            console.log("Matching Username", matchingUserName);
            this.friendList.push({
              'id': this.allUsers[i].id,
              'userName': this.allUsers[i].userName
            });
            console.log("FriendList madhe ky ala", this.friendList);
          }
        }
      })

    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("Got the url id", this.id);

  }

  updateGroup() {
    this.groupService.updateGroup(this.groupForm.value).subscribe(res => {
      this.tostrService.success("Group Updated Successfully");
      console.log("Data Updated");
      this.route.navigate(['user/groups']);
    },
      err => {
        this.tostrService.error("Error Updating Group");
      });

    console.log("Form Value", this.groupForm.value);
  }

  editUsers() {
    for (let i = 0; i < this.editGroup.length; i++) {
      if (this.id == this.editGroup[i].id) {
        console.log("Edit data ala", this.editGroup[i].userId);
      }
    }
  }

  getSelectedValue(status: Boolean, value: String, id: string) {
    if (status) {
      this.checkedList.push(id);
      this.selectedlist.push(value);
      console.log("CheckedList", this.checkedList);
      // this.paidBylist.push({ 'id': id, 'userName': value });
      // console.log("PaidByList:", this.paidBylist);
    } else {
      var index = this.checkedList.indexOf(value);
      var index1 = this.selectedlist.indexOf(value);
      this.checkedList.splice(index, 1);
      this.selectedlist.splice(index1, 1);
      // this.paidBylist.splice(index, 1);
      // console.log("Empty Hotiye ka list", this.paidBylist);
    }
  }

  mouseleavefunc(e: any) {
    this.showDropDown = false;
    console.log("mouse enter");
  }

  deleteGroupUser(id: string) {
    this.groupService.deleteGroupUser(id).subscribe(res => {
      this.tostrService.error("User Deleted Successfully");
      if (id == this.loggedInUser.userName) {
        this.route.navigate(['user/groups']);
      }
      else {
        this.ngOnInit();
      }
    },
      err => {
        this.tostrService.warning("Error in Deleting User");
      })
  }

}
