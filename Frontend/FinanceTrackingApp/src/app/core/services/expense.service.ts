import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { __param } from 'tslib';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getAllExpenses(pageNumber?:number, pageSize?:number): Observable<any> {
    if (pageNumber != null && pageSize != null) {
      return this.httpClient.get(`${environment.baseApiUrl}/api/Expenses?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
    else{
      return this.httpClient.get(`${environment.baseApiUrl}/api/Expenses`);
    }
  }

  AddExpenses(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseApiUrl}/api/Expenses`, data);
  }

  DeleteExpense(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseApiUrl}/api/Expenses/${id}`);
  }

  updateExpense(data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseApiUrl}/api/Expenses`, data);
  }

  getExpensebyGroup(id: number): Observable<any> {
    // const options = {params: new HttpParams().set('groupId', index)}
    return this.httpClient.get(`${environment.baseApiUrl}/api/Expenses/GroupExpenses/${id}`);
  }
}
