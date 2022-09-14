import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { GroupsService } from 'src/core/services/groups.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  selectedlist:any=[];
  allUsers:any;
  checkedList : any=[];
  showDropDown!:boolean;
  groupForm:any;
  constructor(private authService: AuthenticationService, private groupService: GroupsService, private toastrService: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      groupName: new FormControl(''),
      userId: new FormControl(this.checkedList)
    })
    this.authService.getAllUsers().subscribe(res =>{
      console.log("All users",res)
      this.allUsers = res;
    });
  }

  getSelectedValue(status:Boolean,value:String, id:string){
    if(status){
      this.checkedList.push(id);
      this.selectedlist.push(value);  
      console.log("CheckedList",this.checkedList);
    }else{
        var index = this.checkedList.indexOf(value);
        var index1 = this.selectedlist.indexOf(value);
        this.checkedList.splice(index,1);
        this.selectedlist.splice(index1,1);
    }
    // this.currentSelected = {checked : status,name:value};
  }
  mouseleavefunc(e:any){
    this.showDropDown = false;
    console.log("mouse enter");
  }

  createGroup(){
    this.groupService.addGroup(this.groupForm.value).subscribe(res=>{
      console.log(res);
      this.toastrService.success("Group Created Successfully");
      console.log(this.groupForm.value);
      this.route.navigate(['user/groups']);
    },
    err=>{
      this.toastrService.error("Group Creation Failed");
    })
  }

}
