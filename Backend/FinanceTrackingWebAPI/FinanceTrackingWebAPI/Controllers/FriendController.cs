using FinanceTrackingWebAPI.Model;
using FinanceTrackingWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<IActionResult> AddFriend(Friend friend)
        {
            return Ok(await _friendsService.Friend(friend));
        }

        [HttpDelete("{friendUserId}")]
        public bool Delete(string friendUserId)
        {
            return _friendsService.Delete(friendUserId);
        }
    }
}
