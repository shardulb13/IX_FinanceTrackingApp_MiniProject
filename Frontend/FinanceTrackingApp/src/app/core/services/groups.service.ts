import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  baseApiUrl = "http://localhost:46079/api/Groups"
  constructor(private httpClient: HttpClient) { }

  getGroups():Observable<any>{
    return this.httpClient.get(this.baseApiUrl);
  }

  addGroup(data:any):Observable<any>{
    return this.httpClient.post(this.baseApiUrl,data);
  }

  updateGroup(data:any):Observable<any>{
    return this.httpClient.put(this.baseApiUrl,data);
  }

  delete(id:number):Observable<any>{
    return this.httpClient.delete(`${this.baseApiUrl}/${id}`)
  }


}
