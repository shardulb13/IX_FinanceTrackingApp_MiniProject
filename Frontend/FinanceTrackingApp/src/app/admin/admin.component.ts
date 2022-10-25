import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FriendsService } from '../core/services/friends.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  friendList:any;
  constructor(private location: Location, private friendService: FriendsService) { }

  ngOnInit(): void {
    this. getFriendsList();
  }

  getFriendsList(){
    this.friendService.getFriends().subscribe(res=>{
      this.friendList = res;
      console.log("FriendsList", res);
    });
  }

  back() {
    this.location.back();
  }
}
