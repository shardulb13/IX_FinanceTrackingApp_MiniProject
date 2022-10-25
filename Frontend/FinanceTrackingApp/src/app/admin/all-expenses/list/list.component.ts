import { trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { GroupsService } from 'src/app/core/services/groups.service';
declare var bootstrap: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pageNo = 1;
  pageSize = 5;
  totalItems: any;
  expenses: any = [];
  allUsers: any = [];
  allGroups: any = [];
  isShow!: boolean;
  topPosToStartShowing = 100;
  isCollapsed = true;
  readMore = false;
  constructor(private expenseService: ExpenseService, private authService: AuthenticationService, private route: Router, private toastrService: ToastrService) { }
  @HostListener("window:scroll")


  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  ngOnInit(): void {
 
    this.getAllExpenses();
    this.getTotalExpenseCount();

    this.authService.getAllUsers().subscribe(res => {
      this.allUsers = res;
    });
    
  }



  getAllExpenses() {
    this.expenseService.getAllExpenses(this.pageNo, this.pageSize).subscribe(res => {
      this.expenses = res;
    });
  }
  onPageChange(event: any) {
    this.pageNo = event;
    this.getAllExpenses();
  }

  getTotalExpenseCount() {
    this.expenseService.getAllExpenses().subscribe(res => {
      this.totalItems = res.length;
    })
  }
  deleteExpense(id: number) {
    this.expenseService.DeleteExpense(id).subscribe(res => {
      this.toastrService.error("Expense Deleted Successfully");
      this.ngOnInit();
    },
      err => {
        this.toastrService.error("Error in deleting Expense");
      })
  }
  edit(id: number) {
    this.route.navigate([`user/allexpenses/edit/${id}`]);
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
