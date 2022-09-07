using FinanceTrackingWebAPI.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FinanceTrackingWebAPI.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public List<User_Expenses> User_Expenses { get; set; }

    }
}
