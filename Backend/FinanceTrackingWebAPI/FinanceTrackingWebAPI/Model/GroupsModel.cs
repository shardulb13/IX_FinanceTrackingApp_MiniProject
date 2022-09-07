using FinanceTrackingWebAPI.Authentication;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace FinanceTrackingWebAPI.Model
{
    public class GroupsModel
    {
        public int Id { get; set; }

        [Required]
        public string GroupName { get; set; }

        [Required]
        public string UserId { get; set; }

        //[Required]
        //public int FriendsId { get; set; }

        //[Required]
        //public int CreatedBy { get; set; }

        //[Required]
        //public DateTime CreatedOn { get; set; }

        //[Required, DefaultValue(true)]
        //public bool IsActive { get; set; }
    }
}
