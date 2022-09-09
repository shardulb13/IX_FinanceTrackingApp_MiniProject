import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: any;
  constructor(private route:Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      UserName: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl()
    });
  }

  login(){
    this.route.navigate(['login']);
  }
  registerDetails(){
    console.log(this.registerForm.value);
    this.authService.RegsiterDetails(this.registerForm.value).subscribe(res => {
      alert("Successfully Registered");
      this.route.navigate(['login']);
    },
    err=>{
      alert("Registration Unsuccessful");
    })
  }
}
