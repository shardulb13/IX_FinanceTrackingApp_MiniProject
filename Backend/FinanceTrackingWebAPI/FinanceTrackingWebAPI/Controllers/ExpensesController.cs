using FinanceTrackingWebAPI.Model;
using FinanceTrackingWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
        public IActionResult Expenses([FromQuery] Paging pagingParameter)
        {
            string userId = User.FindFirstValue(ClaimTypes.Name);

            var result = _expenseService.GetAllExpenses(userId);
            // Return List of Customer  

            // Get's No of Rows Count   
            int count = result.Count();

            // Parameter is passed from Query string if it is null then it default Value will be null
            int? CurrentPage = pagingParameter.pageNumber;

            // Parameter is passed from Query string if it is null then it default Value will be null 
            int? PageSize = pagingParameter.pageSize;

            // Display TotalCount to Records to User  
            int TotalCount = count;


            if (CurrentPage != null && PageSize != null)
            {
                // Calculating Totalpage by Dividing (No of Records / Pagesize)  
                int TotalPages = (int)Math.Ceiling(count / (double)PageSize);
                var data = result.Skip((CurrentPage - 1).Value * PageSize.Value).Take(PageSize.Value).ToList();
                // Returns List of Customer after applying Paging   

                // if CurrentPage is greater than 1 means it has previousPage  
                var previousPage = CurrentPage > 1 ? "Yes" : "No";

                // if TotalPages is greater than CurrentPage means it has nextPage  
                var nextPage = CurrentPage < TotalPages ? "Yes" : "No";

                // Object which we are going to send in header   
                var paginationMetadata = new
                {
                    totalCount = TotalCount,
                    pageSize = PageSize,
                    currentPage = CurrentPage,
                    totalPages = TotalPages,
                    previousPage,
                    nextPage
                };

                // Setting Header  
                Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetadata));
                // Returing List of expenses list  
                return Ok(data);
            }
            else
            {
                return Ok(result);
            }


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
                    return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Required fields cannot be empty" });
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
