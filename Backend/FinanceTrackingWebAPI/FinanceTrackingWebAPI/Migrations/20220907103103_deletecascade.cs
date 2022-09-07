using Microsoft.EntityFrameworkCore.Migrations;

namespace FinanceTrackingWebAPI.Migrations
{
    public partial class deletecascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Expenses_Expenses_ExpenseId",
                table: "User_Expenses");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Expenses_Expenses_ExpenseId",
                table: "User_Expenses",
                column: "ExpenseId",
                principalTable: "Expenses",
                principalColumn: "ExpensesId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Expenses_Expenses_ExpenseId",
                table: "User_Expenses");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Expenses_Expenses_ExpenseId",
                table: "User_Expenses",
                column: "ExpenseId",
                principalTable: "Expenses",
                principalColumn: "ExpensesId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
