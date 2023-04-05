using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSalaryFromUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salary",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Salary",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
