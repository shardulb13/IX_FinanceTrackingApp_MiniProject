using FinanceTrackingWebAPI.Authentication;
using FinanceTrackingWebAPI.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace FinanceTrackingWebAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserExpenses>().HasOne(e => e.Expenses).WithMany(ue => ue.userExpenses)
                .HasForeignKey(e => e.ExpenseId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserExpenses>().HasOne(e => e.ApplicationUser).WithMany(ue => ue.userExpenses)
                .HasForeignKey(e => e.UserId);

            builder.Entity<UsersGroup>().HasOne(e => e.Groups).WithMany(ue => ue.usersGroup)
            .HasForeignKey(e => e.GroupId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UsersGroup>().HasOne(e => e.ApplicationUser).WithMany(ue => ue.usersGroup)
                .HasForeignKey(e => e.UserId);

            // builder.Entity<UserFriends>().HasOne(e => e.friends).WithMany(uf => uf.userFriends)
            //.HasForeignKey(e => e.FriendId).OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<UserFriends>().HasOne(e => e.ApplicationUser).WithMany(ue => ue.userFriends)
            //     .HasForeignKey(e => e.UserId);

            builder.Entity<ApplicationUser>().HasMany(f => f.Friend).WithOne(u => u.ApplicationUser).OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Expenses>()
            .HasOne(b => b.Groups)
            .WithMany()
            .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(builder);
        }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<UserExpenses> UserExpenses { get; set; }
        public DbSet<Groups> Groups { get; set; }
        public DbSet<UsersGroup> UsersGroup { get; set; }
        public DbSet<Friends> Friends { get; set; }
        //public DbSet<UserFriends> UserFriends { get; set; }

    }
}
