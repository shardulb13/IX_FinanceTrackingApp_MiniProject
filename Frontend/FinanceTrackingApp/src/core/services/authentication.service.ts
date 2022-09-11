import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseApiUrl='http://localhost:46079/api/Authentication'
  constructor(private httpClient:HttpClient, private tokenService: TokenService) { }

  RegsiterDetails(data:string):Observable<any>{
    return this.httpClient.post(`${this.baseApiUrl}/register`,data)
 }

  loginDetails(data:string):Observable<any>{
    return this.httpClient.post(`${this.baseApiUrl}/login`,data);
  }

  getCurrentUserDetails(){
    var url ="http://localhost:46079/api/UserProfile";
    const headers = {Authorization:`Bearer ${this.tokenService.getToken()}`};
    return this.httpClient.get(url,{headers: headers}); 
  }
  getAllUsers(){
    var url = "http://localhost:46079/api/Authentication";
    return this.httpClient.get(url);
  }
}
