using FinanceTrackingWebAPI.Authentication;
using FinanceTrackingWebAPI.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinanceTrackingWebAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserExpenses>().HasOne(e => e.Expenses).WithMany(ue => ue.User_Expenses)
                .HasForeignKey(e => e.ExpenseId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserExpenses>().HasOne(e => e.ApplicationUser).WithMany(ue => ue.User_Expenses)
                .HasForeignKey(e => e.UserId);

            builder.Entity<UsersGroup>().HasOne(e => e.Groups).WithMany(ue => ue.UsersGroup)
            .HasForeignKey(e => e.GroupId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UsersGroup>().HasOne(e => e.ApplicationUser).WithMany(ue => ue.UsersGroup)
                .HasForeignKey(e => e.UserId);

            base.OnModelCreating(builder);
        }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<UserExpenses> UserExpenses { get; set; }
        public DbSet<Groups> Groups { get; set; }
        public DbSet<UsersGroup> UsersGroup { get; set; }

    }
}
