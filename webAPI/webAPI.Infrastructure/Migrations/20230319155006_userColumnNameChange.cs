﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class userColumnNameChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "FullName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Users",
                newName: "Name");
        }
    }
}
