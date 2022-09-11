using FinanceTrackingWebAPI.Model;
using FinanceTrackingWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        public ExpensesController(IExpenseService expenseService)
        {
            _expenseService = expenseService;   
        }

        [HttpGet]
        public IActionResult AllExpenses()
        {
            string userId = User.FindFirstValue(ClaimTypes.Name);
            return Ok(_expenseService.Expenses(userId));
        }

        [HttpPost]
        public async Task<ExpensesModel> AddExpense(ExpensesModel obj)
        {

            return await _expenseService.AddExpenses(obj);
        }

        [HttpPut]
        public async Task<ExpensesModel> UpdateExpense(ExpensesModel obj)
        {
            return await _expenseService.UpdateExpenses(obj);
        }

        [HttpDelete("{id}")]
        public async Task<ExpensesModel> DeleteExpense (int id)
        {
            return await _expenseService.Delete(id);
        }
    }
}
