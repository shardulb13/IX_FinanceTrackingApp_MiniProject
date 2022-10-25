import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  TempGetFriendsList: any = [];
  tempfriendlist: any = [];
  friendsList: any = [];

  constructor(private friendService: FriendsService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.friendService.getFriendsData().subscribe(res => {
      this.tempfriendlist = res;
    });
  }

  delete(friendId: any, userId:any) {
    this.friendService.deleteFriend(friendId, userId).subscribe(res => {
      this.toastrService.error("Friend Deleted Successfully");
      window.location.reload();
    });
  }
}
