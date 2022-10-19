using System.Collections.Generic;

namespace FinanceTrackingWebAPI.Model
{
    public class UsersGroupDTO
    {
        public int groupId { get; set; }
        public string groupName { get; set; }
        
        public string groupAdmin { get; set; }
        public List<string> userIds { get; set; }
    }
}
