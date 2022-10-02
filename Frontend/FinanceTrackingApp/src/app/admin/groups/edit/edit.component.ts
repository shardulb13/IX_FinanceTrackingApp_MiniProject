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
    var exsitingGroupUsers: any;
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
      exsitingGroupUsers = res[0].userId;
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

    // this.authService.getAllUsers().subscribe(res =>{
    //   console.log("All users",res)
    //   this.allUsers = res;
    //   this.friendService.getFriends().subscribe(res=>{
    //     let tempFriendsList = res[0].friendUserId;
    //     console.log("List of Friends", tempFriendsList);
    //     console.log("Matching", exsitingGroupUsers);
    //     for(let i= 0; i<this.allUsers.length; i++){
    //       let matchingUsername = tempFriendsList.filter((x:any) => x == this.allUsers[i].userName);
    //       console.log("Matching Username", matchingUsername);
    //       if(this.allUsers[i].userName == matchingUsername){
    //         if(exsitingGroupUsers == matchingUsername){
    //           this.friendList.push({'id': this.allUsers[i].id, 'userName':this.allUsers[i].userName});
    //           console.log("All Friends", this.friendList);
    //         }
    //       }
    //     }
    //   });
    // });

    this.friendService.getFriendsData().subscribe(res => {
      console.log(res);
      let tempFriendsList = res;
      for (let i = 0; i < tempFriendsList.length; i++) {
        console.log("Username", tempFriendsList[i].username);
        let matchingUsername = exsitingGroupUsers.filter((x: any) => x == tempFriendsList[i].username);
        console.log("MAtcing id", matchingUsername);
        if (tempFriendsList[i].username != matchingUsername ) {
          this.friendList.push({ 'id': tempFriendsList[i].singleFriendUserId, 'userName': tempFriendsList[i].username });
          console.log("All Friends", this.friendList);
        }
      }
    })

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
        location.reload();
      }
    },
      err => {
        this.tostrService.warning("Error in Deleting User");
      })
  }

}
