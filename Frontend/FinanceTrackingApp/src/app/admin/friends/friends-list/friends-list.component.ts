import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FriendsService } from 'src/core/services/friends.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  getFriendsList: any = [];
  constructor(private friendService: FriendsService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.friendService.getFriends().subscribe(res => {
      console.log(res);
      this.getFriendsList = res[0].friendUserId;
      console.log("Got the Friends in the list", this.getFriendsList);
    });
  }

  delete(id:any){
    this.friendService.deleteFriend(id).subscribe(res => {
      this.toastrService.error("Friend Deleted Successfully");
      window.location.reload();
    },
    err=>{
      this.toastrService.warning("Error in deleting friend");
    })
    console.log("Deleting the data", id);
  }


}
