import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { TokenService } from 'src/core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm:FormGroup = new FormGroup({});
  constructor(private route: Router, private fb: FormBuilder, private auth: AuthenticationService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      UserName:['',[Validators.required]],
      Password:['',[Validators.required]]
    })
  }

  get form(){
    return this.LoginForm.controls;
  }
  signup(){
    this.route.navigate(['register']);
  }

  loginDetails(){
    console.log(this.LoginForm.value);
    this.auth.loginDetails(this.LoginForm.value).subscribe(res => {
      if(res){
        alert('Login Successful');
        console.log(res.token);
        this.tokenService.setToken(res.token);
        this.route.navigate(['admin/allexpenses']);
      }
    },
    err =>{
      alert('Invalid Login Details');
    })
  }
}


