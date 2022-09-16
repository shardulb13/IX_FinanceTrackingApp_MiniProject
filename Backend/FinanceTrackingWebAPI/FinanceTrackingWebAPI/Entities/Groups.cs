using FinanceTrackingWebAPI.Authentication;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceTrackingWebAPI.Entities
{
    public class Groups
    {
        public int Id { get; set; }

        public string GroupName { get; set; }

        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        //[ForeignKey("Friends")]
        //public int FriendsId { get; set; }
        //public Friends Friends { get; set; }
    }
}
