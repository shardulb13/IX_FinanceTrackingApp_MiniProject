import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { TokenService } from 'src/core/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
