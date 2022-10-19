using FinanceTrackingWebAPI.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceTrackingWebAPI.Entities
{
    public class Group
    {
        public int Id { get; set; }

        [Required, MaxLength(20)]
        public string GroupName { get; set; }

        [ForeignKey("applicationUser")]
        public string GroupAdmin { get; set; }
        public ApplicationUser applicationUser { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public int ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }

        [Required, DefaultValue(true)]
        public bool IsActive { get; set; }

        public List<UsersGroup> usersGroup { get; set; }

    }
}
