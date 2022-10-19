using FinanceTrackingWebAPI.Model;
using FinanceTrackingWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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
        public IActionResult Expenses()
        {
            string userId = User.FindFirstValue(ClaimTypes.Name);
            return Ok(_expenseService.GetAllExpenses(userId));
        }

        [HttpGet]
        [Route("GroupExpenses/{groupId}")]
        public IActionResult Expenses(int groupId)
        {
            return Ok(_expenseService.GroupExpenses(groupId));
        }

        [HttpPost]
        public async Task<IActionResult> Expense(ExpenseVM expense)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    await _expenseService.AddExpense(expense);
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Expense added successfully" });

                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Required fields cannot be empty" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Something went wrong" });
            }

        }

        [HttpPut]
        public async Task<IActionResult> UpdateExpense(ExpenseVM expense)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _expenseService.UpdateExpense(expense);
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Expense updated successfully" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest,new Response { Status = "Error", Message = "Required fields cannot be empty" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Something went wrong" });
            }

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExpense(int id)
        {
            try
            {
                var deleteExpense = _expenseService.DeleteExpense(id);
                if (deleteExpense)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Expense deleted successfully" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Expense Id not found" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Something went wrong please try again" });
            }
        }
    }
}
