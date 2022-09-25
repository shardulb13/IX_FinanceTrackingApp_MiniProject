using FinanceTrackingWebAPI.Model;
using FinanceTrackingWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
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
            //string userId = User.FindFirstValue(ClaimTypes.Name);
            string userId = User.Claims.First(o => o.Type == "UserID").Value;
            return Ok(_friendsService.friends(userId));
        }

        [HttpPost]
        public IActionResult AddFriend(FriendVM friend)
        {
            try
            {
                return Ok(_friendsService.Friend(friend));
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{friendUserId}")]
        public bool DeleteFriend(string friendUserId)
        {
            return _friendsService.Delete(friendUserId);
        }
    }
}
