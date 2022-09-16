using FinanceTrackingWebAPI.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FinanceTrackingWebAPI.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public List<UserExpenses> userExpenses { get; set; }

        public List<UsersGroup> UsersGroup { get; set; }


    }
}
