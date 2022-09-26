import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-profile-page-nav',
  templateUrl: './profile-page-nav.component.html',
  styleUrls: ['./profile-page-nav.component.scss']
})
export class ProfilePageNavComponent implements OnInit {

  userDetails!:any;
  constructor(private tokenService: TokenService, private route: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getCurrentUserDetails().subscribe(val => {
      console.log(val);
      this.userDetails = val;
    })
  }

  logout(){
    this.tokenService.deleteToken();
    this.route.navigate(['']);
    
  }
}
