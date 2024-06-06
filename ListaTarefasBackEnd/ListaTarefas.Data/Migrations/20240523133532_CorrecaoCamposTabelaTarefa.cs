using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ListaTarefas.Data.Migrations
{
    public partial class CorrecaoCamposTabelaTarefa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "datafim",
                table: "tarefa");

            migrationBuilder.DropColumn(
                name: "datainicio",
                table: "tarefa");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "datafim",
                table: "tarefa",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "datainicio",
                table: "tarefa",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
