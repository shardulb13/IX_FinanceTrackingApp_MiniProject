using System;

namespace FinanceTrackingWebAPI.Model
{
    public class Group
    {
        public int ExpensesId { get; set; }

        public string ExpenseName { get; set; }

        public DateTime ExpenseDate { get; set; }

        public int Amount { get; set; }

        public string PaidBy { get; set; }
        public int GroupId { get; set; }
    }
}
