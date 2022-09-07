using Microsoft.EntityFrameworkCore.Migrations;

namespace FinanceTrackingWebAPI.Migrations
{
    public partial class nullableEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Expenses_Expenses_ExpenseId",
                table: "User_Expenses");

            migrationBuilder.AlterColumn<int>(
                name: "ExpenseId",
                table: "User_Expenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Expenses_Expenses_ExpenseId",
                table: "User_Expenses",
                column: "ExpenseId",
                principalTable: "Expenses",
                principalColumn: "ExpensesId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Expenses_Expenses_ExpenseId",
                table: "User_Expenses");

            migrationBuilder.AlterColumn<int>(
                name: "ExpenseId",
                table: "User_Expenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Expenses_Expenses_ExpenseId",
                table: "User_Expenses",
                column: "ExpenseId",
                principalTable: "Expenses",
                principalColumn: "ExpensesId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
