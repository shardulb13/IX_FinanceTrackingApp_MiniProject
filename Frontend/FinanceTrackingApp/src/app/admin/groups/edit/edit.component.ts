import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupsService } from 'src/core/services/groups.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  groupForm:any;
  editGroup:any;
  editUserId:any;
  id!:any;
  constructor(private groupService: GroupsService, private activatedRoute: ActivatedRoute, private tostrService: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      id: new FormControl(''),
      groupName: new FormControl(''),
      userId: new FormControl('')
    });

    this.groupService.getGroups().subscribe(res =>{
      this.editGroup = res;
      console.log("Edit Expense", this.editGroup);
      for(let i = 0; i<this.editGroup.length;i++){
        if(this.id == this.editGroup[i].id){
          this.groupForm.controls.id.setValue(this.editGroup[i].id);
          this.groupForm.controls.groupName.setValue(this.editGroup[i].groupName);
          this.groupForm.controls.userId.setValue(this.editGroup[i].userId);
          this.editUserId = this.editGroup[i].userId;
          console.log("Edit madhe ala data", this.editUserId);
         }
      }
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("Got the url id", this.id);
  }

  updateGroup(){
    this.groupService.updateGroup(this.groupForm.value).subscribe(res =>{
      this.tostrService.success("Group Updated Successfully");
      console.log("Data Updated");
      this.route.navigate(['user/groups']);
    },
    err=>{
      this.tostrService.error("Error Updating Group");
    });
  }

  editUsers(){
    for(let i =0; i<this.editGroup.length; i++){
      if(this.id == this.editGroup[i].id){
        console.log("Edit data ala",this.editGroup[i].userId);
      }
    }
  }
}
