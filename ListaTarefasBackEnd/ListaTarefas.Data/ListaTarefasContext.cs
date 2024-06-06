using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ListaTarefas.Data
{
    public class ListaTarefasContext : DbContext, IUnitOfWork
    {
        private readonly string _connection;

        public ListaTarefasContext(DbContextOptions optionsBuilder) : base(optionsBuilder) 
        {

        }

        public ListaTarefasContext(string connetionString)
        {
            _connection = connetionString;
        }

        public DbSet<Tarefa> Tarefas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!string.IsNullOrEmpty(_connection)) 
            { 
                optionsBuilder.UseMySQL(_connection);                                                
            }
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ListaTarefasContext).Assembly);
        }

        public async Task<bool> Commit()
        {
            foreach (var entry in ChangeTracker.Entries()
                         .Where(entry => entry.Entity.GetType().GetProperty("DataUltimaPersistencia") != null))
            {
                entry.Property("DataUltimaPersistencia").CurrentValue = DateTime.Now;
            }

            return await base.SaveChangesAsync() > 0;
        }
    }
}
