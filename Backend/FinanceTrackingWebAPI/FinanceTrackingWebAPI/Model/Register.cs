using System.ComponentModel.DataAnnotations;

namespace FinanceTrackingWebAPI.Model
{
    public class Register
    {
        public string UserName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
