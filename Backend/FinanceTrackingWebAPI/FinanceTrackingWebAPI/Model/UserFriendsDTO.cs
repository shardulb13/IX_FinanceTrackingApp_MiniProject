using System.Collections.Generic;
using System;

namespace FinanceTrackingWebAPI.Model
{
    public class UserFriendsDTO
    {
        public string userId { get; set; }
        public List<string> friendId { get; set; }
    }
}
