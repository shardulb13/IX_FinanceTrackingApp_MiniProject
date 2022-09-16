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
            builder.Entity<User_Expenses>().HasOne(e => e.Expenses).WithMany(ue => ue.User_Expenses)
                .HasForeignKey(e => e.ExpenseId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User_Expenses>().HasOne(e => e.ApplicationUser).WithMany(ue => ue.User_Expenses)
                .HasForeignKey(e => e.UserId);

            //builder.Ignore<IdentityUserLogin<string>>();
            //builder.Ignore<IdentityUserRole<string>>();
            //builder.Ignore<IdentityUserToken<string>>();
            //builder.Ignore<IdentityUserClaim<string>>();
            //builder.Ignore<IdentityUser<string>>();
            //builder.Ignore<ApplicationUser>();
            base.OnModelCreating(builder);
        }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<User_Expenses> User_Expenses { get; set; }
        public DbSet<Groups> Groups { get; set; }
    }
}
