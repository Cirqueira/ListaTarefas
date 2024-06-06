using Dapper;
using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System;
using System.Threading.Tasks;

namespace ListaTarefas.Data.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly MySqlConnection _connection;
        private readonly ListaTarefasContext _context;

        public UsuarioRepository(ListaTarefasContext context)
        {
            _context = context;
            _connection = new(_context.Database.GetConnectionString());
        }

        public async Task<Usuario> ObterPorUsuarioESenhaAsync(string email, string password)
        {
            var sql = "SELECT * FROM usuario where email=@email and password=@password;";

            return await _connection.QueryFirstOrDefaultAsync<Usuario>(sql, new
            {
               email, password
            });
        }

        public void Dispose()
        {
            _context?.Dispose();
            _connection?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
