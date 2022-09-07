﻿using System;
using System.Collections.Generic;

namespace FinanceTrackingWebAPI.Model
{
    public class User_ExpenseDTO
    {
        public int expenseId { get; set; }
        public string expenseName { get; set; }
        public DateTime date { get; set; }
        public int amount { get; set; }
        public string paidby { get; set; }
        //public string userId { get; set; }

        public List<string> userIds { get; set; }
    }
}
