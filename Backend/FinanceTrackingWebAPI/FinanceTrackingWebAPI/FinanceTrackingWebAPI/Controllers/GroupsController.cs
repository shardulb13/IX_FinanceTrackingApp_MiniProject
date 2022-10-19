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
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService _groupService;
        public GroupsController(IGroupService groupService)
        {
            _groupService = groupService;
        }
        [HttpGet]
        public IActionResult Groups()
        {
            string userId = User.FindFirstValue(ClaimTypes.Name);
            return Ok(_groupService.GetAllGroups(userId));
        }

        [HttpPost]
        public async Task<IActionResult> AddGroups(GroupVM groupModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    await _groupService.CreateGroup(groupModel);
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Group created successfully" });

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
        public async Task<IActionResult> UpdateGroup(GroupVM groupModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _groupService.UpdateGroup(groupModel);
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Group updated successfully" });
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
        public IActionResult DeleteGroup(int id)
        {
            try
            {
                var deleteGroup = _groupService.DeleteGroup(id);
                if (deleteGroup)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Group deleted successfully" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Invalid Group Id" });

                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Something went wrong" });
            }
        }

        [HttpDelete]
        [Route("DeleteGroupUser/{userId}")]
        public IActionResult DeleteGroupUser(string userId)
        {
            try
            {
                var deleteGroupUser = _groupService.DeleteGroupUser(userId);
                if (deleteGroupUser)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "User deleted successfully" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Id not found" });

                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Something went wrong" });
            }
        }
    }
}
