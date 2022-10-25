import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listOfGroups:any=[];
  groupRights:boolean= true;
  loggedInUser:any;
  isCollapsed = true;
  constructor(private groupService: GroupsService, private route: Router, private toastrService: ToastrService, private authService: AuthenticationService) { }

  ngOnInit(): void {

    this.groupService.getGroups().subscribe(result=>{
      this.listOfGroups = result;
      console.log(this.listOfGroups);
    });
    this.authService.getCurrentUserDetails().subscribe(res=>{
      this.loggedInUser = res;
      console.log(this.loggedInUser);
    });
  }

  deleteGroup(id:number){
    this.groupService.deleteGroup(id).subscribe(del=>{
      this.toastrService.error("Group Deleted Successfully");
      this.ngOnInit();
    },
    err=>{
      this.toastrService.error("Error in deleting group");
    });
  }

  edit(id:number){
    this.route.navigate([`user/groups/editGroup/${id}`]);
  }
  view(id:number){
    this.route.navigate([`user/groups/groupexpenses/${id}`]);
  }
}
