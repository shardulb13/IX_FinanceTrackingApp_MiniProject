using System.Collections.Generic;

namespace FinanceTrackingWebAPI.Model
{
    public class Friend
    {
        public int FriendId { get; set; }
        public string UserId { get; set; }
        //public string FriendUserName { get; set; }
        public List<string> FriendUserId { get; set; }
    }
}
