import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { GroupsService } from 'src/app/core/services/groups.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pageNo = 1;
  expenses: any = [];
  allUsers: any = [];
  allGroups: any = [];
  isShow!: boolean;
  topPosToStartShowing = 100;
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
    this.expenseService.getAllExpenses().subscribe(res => {
      this.expenses = res;
    });

    this.authService.getAllUsers().subscribe(res => {
      this.allUsers = res;
    });

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
