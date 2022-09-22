import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  baseApiUrl = "http://localhost:46079/api/Friend";
  constructor(private httpClient: HttpClient) { }

  getFriends():Observable<any>{
    return this.httpClient.get(this.baseApiUrl);
  }

  addFriend(data:any):Observable<any>{
    return this.httpClient.post(this.baseApiUrl, data);
  }

  deleteFriend(id:number):Observable<any>{
    return this.httpClient.delete(`${this.baseApiUrl}/${id}`);
  }
}
