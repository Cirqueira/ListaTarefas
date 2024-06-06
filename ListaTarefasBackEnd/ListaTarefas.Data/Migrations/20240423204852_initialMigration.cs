using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace ListaTarefas.Data.Migrations
{
    public partial class initialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tarefa",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    titulo = table.Column<string>(type: "varchar(30)", maxLength: 100, nullable: false),
                    descricao = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    datavencimento = table.Column<DateTime>(type: "date", nullable: true),
                    datainicio = table.Column<DateTime>(type: "date", nullable: false),
                    datafim = table.Column<DateTime>(type: "date", nullable: true),
                    completa = table.Column<bool>(type: "bit(1)", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tarefa", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    email = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "usuario",
                columns: new[] { "id", "email", "password" },
                values: new object[] { 1, "root", "1234" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tarefa");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
