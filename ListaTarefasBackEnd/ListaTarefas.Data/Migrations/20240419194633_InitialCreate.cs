using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace ListaTarefas.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tarefa",
                columns: table => new
                {
                    tarefaid = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    tarefatitulo = table.Column<string>(type: "varchar(30)", maxLength: 100, nullable: true),
                    tarefadescricao = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    tarefadtvenc = table.Column<DateTime>(type: "date", nullable: true),
                    tarefadtinico = table.Column<DateTime>(type: "date", nullable: true),
                    tarefadtfim = table.Column<DateTime>(type: "date", nullable: true),
                    tarefacompleta = table.Column<bool>(type: "bit(1)", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tarefa", x => x.tarefaid);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tarefa");
        }
    }
}
