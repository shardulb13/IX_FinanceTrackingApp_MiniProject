using FinanceTrackingWebAPI.Model;
using FinanceTrackingWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase
    {
        private readonly IFriendsService _friendsService;
        public FriendController(IFriendsService friendsService)
        {
            _friendsService = friendsService;
        }

        [HttpGet]
        public IActionResult GetFriends()
        {
            string userId = User.Claims.First(o => o.Type == "UserID").Value;
            return Ok(_friendsService.GetAllFriends(userId));
        }

        [HttpGet]
        [Route("FriendsData")]
        public IActionResult GetFriendsData()
        {
            string userId = User.Claims.First(o => o.Type == "UserID").Value;
            return Ok(_friendsService.GetFriendsData(userId));
        }

        [HttpPost]
        public IActionResult AddFriend(FriendVM friend)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _friendsService.AddFriend(friend);
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Friend added successfully" });
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

        [HttpDelete("{friendUserId}")]
        public IActionResult DeleteFriend(string friendUserId, string userId)
        {
            try
            {
                var deleteFriend = _friendsService.DeleteFriend(friendUserId, userId);
                if (deleteFriend)
                {
                    return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Friend deleted successfully" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "Invalid Id" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Something went wrong" });
            }
        }
    }
}
