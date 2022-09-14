using FinanceTrackingWebAPI.Data;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.DataAccessLayer
{
    public interface IExpenseDA
    {
        IEnumerable<UserExpenseDTO> Expenses(string userid);
        Task<Expenses> Expenses(Expenses expense);
        Task<UserExpenses> Expenses(UserExpenses userExpense);
        Task<Expenses> UpdateExpenses(Expenses expenses);
        Task<Expenses> Delete(int id);



    }
    public class ExpenseDA : IExpenseDA
    {
        private readonly ApplicationDbContext _context;
        public ExpenseDA(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Expenses> Expenses(Expenses expenses)
        {
            var result = await _context.Expenses.AddAsync(expenses);
            _context.SaveChanges();
            
            return result.Entity;
        }
        public async Task<UserExpenses>Expenses(UserExpenses userExpense)
        {
            var result = await _context.UserExpenses.AddAsync(userExpense);
            _context.SaveChanges();
            return result.Entity;
        }
        public async Task<Expenses> Delete(int id)
        {
            var result = await _context.Expenses.FirstOrDefaultAsync(a => a.ExpensesId == id);
            if (result != null)
            {
                _context.Expenses.Remove(result);
                _context.SaveChanges();
                return result;
            }
            return null;
        }

        public IEnumerable<UserExpenseDTO> Expenses(string userid)
        {
  
            var joinresult = _context.Expenses.Select(o=> new UserExpenseDTO
            {
                expenseId = o.ExpensesId,
                expenseName = o.ExpenseName,
                amount = o.Amount,
                date = o.ExpenseDate,
                paidby = o.ApplicationUser.UserName,
                //userIds= o.User_Expenses.Select(ue=> ue.UserId).ToList(),
                userIds= o.User_Expenses.Select(un=> un.ApplicationUser.UserName).ToList()

            });
            var res = joinresult.Where(a => a.userIds.Contains(userid)).ToList();
            if (res != null)
            {
                return res;
            }
            return null;
        }
       
        public async Task<Expenses> UpdateExpenses(Expenses expenses)
        {
            var update = await _context.Expenses.FirstOrDefaultAsync(a => a.ExpensesId == expenses.ExpensesId);
            if (update != null)
            {
                update.ExpenseName = expenses.ExpenseName;
                update.ExpenseDate = expenses.ExpenseDate;
                update.Amount = expenses.Amount;
                update.PaidBy = expenses.PaidBy;
                //update.UserID = obj.UserID;
                await _context.SaveChangesAsync();
               
                return update;
            }
            return null;
        }

        //public async Task<User_Expenses> Expenses(User_Expenses userExpense, int id)
        //{
        //    var update = await _context.User_Expenses.FirstOrDefaultAsync(a => a.ExpenseId == id);
        //    if(update != null)
        //    {
        //        update.ExpenseId = userExpense.ExpenseId;
        //        update.UserId = userExpense.UserId;
        //        await _context.SaveChangesAsync();
        //        return update;
        //    }
        //    return null;
        //}

        //public async Task<User_Expenses> DeleteExp(string id)
        //{
        //    var result = await _context.User_Expenses.Where(a => a.UserId == id).FirstOrDefaultAsync();
        //    foreach(var expense in result.UserId)
        //    {
        //        //if (result != null)
        //        //{
        //            _context.User_Expenses.Remove(result);
        //            await _context.SaveChangesAsync();
        //            return result;
        //        //}
        //    }
        //    return null;
        //}
    }
}
