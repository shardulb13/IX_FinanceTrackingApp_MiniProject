import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { FriendsService } from 'src/core/services/friends.service';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.scss']
})
export class AddfriendComponent implements OnInit {
checkedList:any=[];
friendsList:any=[];
selectedlist:any=[];
showDropDown!:boolean;
allUsers:any;
loggedInUser:any;
addFriendForm:any;
  constructor( private authService: AuthenticationService, private friendsService: FriendsService, private route: Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(res=>{
      this.allUsers = res;
      console.log("Got all users", this.allUsers);
    });

    this.authService.getCurrentUserDetails().subscribe(res=>{
      this.loggedInUser = res;
      console.log("LOgged In user", this.loggedInUser);
    });

    this.addFriendForm = new FormGroup({
      userId: new FormControl(),
      friendUserId: new FormControl(),
    });
  }

  getSelectedValue(status:Boolean,value:String, id:string){
    if(status){
      this.checkedList.push(id);
      this.selectedlist.push(value);  
      // console.log("CheckedList",this.checkedList);
      this.friendsList.push({'id':id, 'userName': value});
      // console.log("friendsList:",this.friendsList);
    }else{
        var index = this.checkedList.indexOf(value);
        var index1 = this.selectedlist.indexOf(value);
        this.checkedList.splice(index,1);
        this.selectedlist.splice(index1,1);
        this.friendsList.splice(index,1);
        // console.log("Empty Hotiye ka list", this.friendsList);
    }
  }

  mouseleavefunc(e:any){
    this.showDropDown = false;
    // console.log("mouse enter");
  }

  addFriend(){
    this.addFriendForm.controls['userId'].setValue(this.loggedInUser.id);
    this.addFriendForm.controls['friendUserId'].setValue(this.checkedList);

    this.friendsService.addFriend(this.addFriendForm.value).subscribe(res =>{
      this.toastrService.success("Friend Added Successfully");
      this.route.navigate(['user/friends']);
    },
    err=>{
      this.toastrService.error("Error in adding friend");
    })
    console.log(this.addFriendForm.value);
    
  }
}
