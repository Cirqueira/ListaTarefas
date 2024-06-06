using ListaTarefas.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ListaTarefas.Data.Configurations
{
    public class UsuarioConfig : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedOnAdd();

            builder.Property(u => u.Id).HasColumnName("id").HasColumnType("int(11)");
            builder.Property(t => t.Email).HasColumnName("email").HasColumnType("varchar(100)").HasMaxLength(100).IsRequired(true);
            builder.Property(t => t.Password).HasColumnName("password").HasColumnType("varchar(100)").HasMaxLength(100).IsRequired(true);
          

            builder.HasData(
                new List<Usuario>() { 
                    new Usuario{ 
                        Id = 1,
                        Email = "root",
                        Password = "1234",
                    } 
                }
              );

            builder.ToTable("usuario");
        }
    }
}
