using ListaTarefas.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ListaTarefas.Data.Configurations
{
    public class TarefaConfig : IEntityTypeConfiguration<Tarefa>
    {
        public void Configure(EntityTypeBuilder<Tarefa> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).ValueGeneratedOnAdd();

            builder.Property(t => t.Id).HasColumnName("id").HasColumnType("int(11)");
            builder.Property(t => t.Titulo).HasColumnName("titulo").HasColumnType("varchar(30)").HasMaxLength(100).IsRequired(true);
            builder.Property(t => t.Descricao).HasColumnName("descricao").HasColumnType("varchar(100)").HasMaxLength(100).IsRequired(true);
            builder.Property(t => t.DataVencimento).HasColumnName("datavencimento").HasColumnType("date").IsRequired(false);
            builder.Property(t => t.Completa).HasColumnName("completa").HasColumnType("bit(1)").HasDefaultValue(false);

            builder.ToTable("tarefa");
        }
    }
}
