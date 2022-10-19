using Microsoft.EntityFrameworkCore.Migrations;

namespace FinanceTrackingWebAPI.Migrations
{
    public partial class added_groupAdmin_field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "GroupAdmin",
                table: "Groups",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Groups_GroupAdmin",
                table: "Groups",
                column: "GroupAdmin");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_AspNetUsers_GroupAdmin",
                table: "Groups",
                column: "GroupAdmin",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_AspNetUsers_GroupAdmin",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Groups_GroupAdmin",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "GroupAdmin",
                table: "Groups");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "Groups",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
