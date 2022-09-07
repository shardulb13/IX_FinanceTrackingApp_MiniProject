using FinanceTrackingWebAPI.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceTrackingWebAPI.Entities
{
    public class Expenses
    {
        [Key]
        public int ExpensesId { get; set; }

        [Required]
        public string ExpenseName { get; set; }

        [Required]
        public DateTime ExpenseDate { get; set; }

        [Required]
        public int Amount { get; set; }

        [Required]
        public string PaidBy { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        public int ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }

        [Required, DefaultValue(true)]
        public bool IsActive { get; set; }


       
        //public string UserID { get; set; }
        public List<User_Expenses> User_Expenses { get; set; }


    }
}
