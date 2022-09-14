using FinanceTrackingWebAPI.Data;
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
        IEnumerable<ExpensesModel> Expenses(string userid);
        Task<ExpensesModel> AddExpenses(ExpensesModel expense);
        Task<ExpensesModel> UpdateExpenses(ExpensesModel obj);
        Task<ExpensesModel> Delete(int id);
    }
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseDA _expenseDA;

        public ExpenseService(IExpenseDA expenseDA)
        {
            _expenseDA = expenseDA;


        }

        public async Task<ExpensesModel> AddExpenses(ExpensesModel obj)
        {
            var expense = new Expenses
            {
                ExpenseName = obj.ExpenseName,
                ExpenseDate = obj.ExpenseDate,
                Amount = obj.Amount,
                PaidBy = obj.PaidBy,
                CreatedBy = obj.ExpensesId,
                CreatedOn = DateTime.Now,
                IsActive = obj.IsActive,
                //UserID = obj.UserID,
            };
            var add = await _expenseDA.Expenses(expense);
            foreach (var id in obj.UserId)
            {
                var user_expenses = new UserExpenses
                {
                    ExpenseId = expense.ExpensesId,
                    UserId = id,
                };
                await _expenseDA.Expenses(user_expenses);
            }
            return new ExpensesModel
            {
                ExpensesId = add.ExpensesId,
            };
        }

        public async Task<ExpensesModel> Delete(int id)
        {
            var deleteData = await _expenseDA.Delete(id);
            if (deleteData != null)
            {
                return new ExpensesModel
                {
                    ExpensesId = deleteData.ExpensesId,
                };
            }
            return null;
        }

        public IEnumerable<ExpensesModel> Expenses(string userid)
        {
            var result = _expenseDA.Expenses(userid);
            if (result != null)
            {
                return (from exp in result
                        select new ExpensesModel
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

        public async Task<ExpensesModel> UpdateExpenses(ExpensesModel obj)
        {
            var expObj = new Expenses
            {
                ExpensesId = obj.ExpensesId,
                ExpenseName = obj.ExpenseName,
                ExpenseDate = obj.ExpenseDate,
                Amount = obj.Amount,
                PaidBy = obj.PaidBy,


            };
            var updatedata = await _expenseDA.UpdateExpenses(expObj);
            //foreach(var i in obj.UserId)
            //{
            //    await _expenseDA.DeleteExp(i);
            //}
            //foreach (var i in obj.UserId)
            //{
            //    var user_expenses = new User_Expenses
            //    {
            //        ExpenseId = id,
            //        UserId = i,
            //    };

            //    await _expenseDA.Expenses(user_expenses,id);
            //}
            return new ExpensesModel
            {
                ExpensesId = updatedata.ExpensesId
            };
        }
    }
}
