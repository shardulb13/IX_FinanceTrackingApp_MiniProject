using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FinanceTrackingWebAPI.Migrations
{
    public partial class adding_relationship_to_tables_financeDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_ApplicationUser_PaidBy",
                table: "Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_ApplicationUser_FriendUserId",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_ApplicationUser_UserId",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_AspNetUsers_ApplicationUserNewId",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_UserExpenses_ApplicationUser_UserId",
                table: "UserExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_UserExpenses_AspNetUsers_ApplicationUserNewId",
                table: "UserExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersGroup_ApplicationUser_UserId",
                table: "UsersGroup");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersGroup_AspNetUsers_ApplicationUserNewId",
                table: "UsersGroup");

            migrationBuilder.DropTable(
                name: "ApplicationUser");

            migrationBuilder.DropIndex(
                name: "IX_UsersGroup_ApplicationUserNewId",
                table: "UsersGroup");

            migrationBuilder.DropIndex(
                name: "IX_UserExpenses_ApplicationUserNewId",
                table: "UserExpenses");

            migrationBuilder.DropIndex(
                name: "IX_Friends_ApplicationUserNewId",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "ApplicationUserNewId",
                table: "UsersGroup");

            migrationBuilder.DropColumn(
                name: "ApplicationUserNewId",
                table: "UserExpenses");

            migrationBuilder.DropColumn(
                name: "ApplicationUserNewId",
                table: "Friends");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_AspNetUsers_PaidBy",
                table: "Expenses",
                column: "PaidBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_AspNetUsers_FriendUserId",
                table: "Friends",
                column: "FriendUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_AspNetUsers_UserId",
                table: "Friends",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserExpenses_AspNetUsers_UserId",
                table: "UserExpenses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersGroup_AspNetUsers_UserId",
                table: "UsersGroup",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_AspNetUsers_PaidBy",
                table: "Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_AspNetUsers_FriendUserId",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_AspNetUsers_UserId",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_UserExpenses_AspNetUsers_UserId",
                table: "UserExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersGroup_AspNetUsers_UserId",
                table: "UsersGroup");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserNewId",
                table: "UsersGroup",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserNewId",
                table: "UserExpenses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserNewId",
                table: "Friends",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApplicationUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    Firstname = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Lastname = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUser", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsersGroup_ApplicationUserNewId",
                table: "UsersGroup",
                column: "ApplicationUserNewId");

            migrationBuilder.CreateIndex(
                name: "IX_UserExpenses_ApplicationUserNewId",
                table: "UserExpenses",
                column: "ApplicationUserNewId");

            migrationBuilder.CreateIndex(
                name: "IX_Friends_ApplicationUserNewId",
                table: "Friends",
                column: "ApplicationUserNewId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_ApplicationUser_PaidBy",
                table: "Expenses",
                column: "PaidBy",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_ApplicationUser_FriendUserId",
                table: "Friends",
                column: "FriendUserId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_ApplicationUser_UserId",
                table: "Friends",
                column: "UserId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_AspNetUsers_ApplicationUserNewId",
                table: "Friends",
                column: "ApplicationUserNewId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserExpenses_ApplicationUser_UserId",
                table: "UserExpenses",
                column: "UserId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserExpenses_AspNetUsers_ApplicationUserNewId",
                table: "UserExpenses",
                column: "ApplicationUserNewId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersGroup_ApplicationUser_UserId",
                table: "UsersGroup",
                column: "UserId",
                principalTable: "ApplicationUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersGroup_AspNetUsers_ApplicationUserNewId",
                table: "UsersGroup",
                column: "ApplicationUserNewId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
