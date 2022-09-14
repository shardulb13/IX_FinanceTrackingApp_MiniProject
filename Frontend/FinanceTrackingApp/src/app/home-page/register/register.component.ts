import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: any;
  constructor(private route:Router, private authService: AuthenticationService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      UserName: new FormControl('', [Validators.required]),
      Email: new FormControl('',[Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z0-9@]{8,15}$/)])
    });
  }

  get form(){
    return this.registerForm.controls;
  }
  login(){
    this.route.navigate(['login']);
  }
  registerDetails(){
    console.log(this.registerForm.value);
    this.authService.RegsiterDetails(this.registerForm.value).subscribe(res => {
      this.toastrService.success("Successfully Registered");
      this.route.navigate(['login']);
    },
    err=>{
      this.toastrService.error("Registration Unsuccessful");
    })
  }
}
