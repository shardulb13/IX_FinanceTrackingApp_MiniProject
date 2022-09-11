import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseApiUrl = "http://localhost:46079/api/Expenses";
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getAllExpenses():Observable<any>{
    // const headers = {Authorization:`Bearer ${this.tokenService.getToken()}`};
    return this.httpClient.get(this.baseApiUrl);
  }

  AddExpenses(data:any):Observable<any>{
    // const headers = {Authorization:`Bearer ${this.tokenService.getToken()}`};
    return this.httpClient.post(this.baseApiUrl, data);
  }

  DeleteExpense(id:number):Observable<any>{
    // const headers = {Authorization:`Bearer ${this.tokenService.getToken()}`};
    return this.httpClient.delete(`${this.baseApiUrl}/${id}`);
  }

  updateExpense(data:any):Observable<any>{
    // const headers = {Authorization:`Bearer ${this.tokenService.getToken()}`};
    return this.httpClient.put(`${this.baseApiUrl}`, data);
  }
}
