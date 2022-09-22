﻿using FinanceTrackingWebAPI.Data;
using FinanceTrackingWebAPI.DataAccessLayer;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Services
{
    public interface IExpenseService
    {
        IEnumerable<Expense> Expenses(string userId);
        IEnumerable<Expense> GroupExpenses(int groupId);
        Task<int> Expense(Expense expense);
        Task<int> UpdateExpense(Expense expense);
        bool Delete(int id);
    }
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseDA _expenseDA;

        public ExpenseService(IExpenseDA expenseDA)
        {
            _expenseDA = expenseDA;


        }

        public async Task<int> Expense(Expense expense)
        {
            var expenseModel = new Expenses
            {
                ExpenseName = expense.ExpenseName,
                ExpenseDate = expense.ExpenseDate,
                Amount = expense.Amount,
                PaidBy = expense.PaidBy,
                GroupId = expense.GroupId,
                CreatedBy = expense.ExpensesId,
                CreatedOn = DateTime.Now,
                IsActive = expense.IsActive,
            };
            var expenseId = await _expenseDA.Expenses(expenseModel);
            if (expense.UserId.Count == 0)
            {
                return expenseId;
            }
            foreach (var id in expense.UserId)
            {
                var userExpenses = new UserExpenses
                {
                    ExpenseId = expenseModel.ExpensesId,
                    UserId = id,
                };
                await _expenseDA.UserExpenses(userExpenses);
            }
            return expenseId;
        }

        public bool Delete(int id)
        {
            return _expenseDA.Delete(id);
        }

        public IEnumerable<Expense> Expenses(string userId)
        {
            var result = _expenseDA.Expenses(userId);
            if (result != null)
            {
                return (from exp in result
                        select new Expense
                        {
                            ExpensesId = exp.expenseId,
                            ExpenseName = exp.expenseName,
                            ExpenseDate = exp.date,
                            Amount = exp.amount,
                            PaidBy = exp.paidby,
                            UserId = exp.userIds
                        }).ToList();
            }
            return null;
        }
        public IEnumerable<Expense> GroupExpenses(int groupId)
        {
            var result = _expenseDA.GroupExpenses(groupId);
            if (result != null)
            {
                return (from exp in result
                        select new Expense
                        {
                            ExpensesId = exp.ExpensesId,
                            ExpenseName = exp.ExpenseName,
                            ExpenseDate = exp.ExpenseDate,
                            Amount = exp.Amount,
                            PaidBy = exp.PaidBy,
                            GroupId = exp.GroupId,
                            UserId = exp.UserIds
                        }).ToList();
            }
            return null;
        }

        public async Task<int> UpdateExpense(Expense expense)
        {
            var expenseModel = new Expenses
            {
                ExpensesId = expense.ExpensesId,
                ExpenseName = expense.ExpenseName,
                ExpenseDate = expense.ExpenseDate,
                Amount = expense.Amount,
                PaidBy = expense.PaidBy,
            };
            var updatedExpenseId = await _expenseDA.UpdateExpenses(expenseModel);
            //foreach (var i in expense.UserId)
            //{

            //}
            foreach (var i in expense.UserId)
            {
                var modifyUserExpenses = new UserExpenses
                {
                    ExpenseId = expenseModel.ExpensesId,
                    UserId = i,
                };

                var getUsers = _expenseDA.GetUsers(expense.ExpensesId);
                //foreach (var id in getUsers)
                //{
                //    if (id.Equals(modifyUserExpenses.UserId))
                //    {
                //        return updatedExpenseId;
                //    }
                //    else
                //    {
                //        await _expenseDA.UserExpenses(modifyUserExpenses);
                //    }

                //}

                foreach (var id in getUsers)
                {
                    if (id.UserId.Equals(modifyUserExpenses.UserId))
                    {
                        break;
                    }
                }
                await _expenseDA.UserExpenses(modifyUserExpenses);

            }
            return updatedExpenseId;
        }
    }
}
