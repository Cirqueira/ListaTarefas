using Dapper;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Threading.Tasks;
using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces;
using ListaTarefas.Domain.Interfaces.Repository;

namespace ListaTarefas.Data.Repositories
{
    public class TarefaRepository : ITarefaRepository
    {
        private readonly MySqlConnection _connection;
        private readonly ListaTarefasContext _context;
        public IUnitOfWork UnitOfWork => _context;

        public TarefaRepository(ListaTarefasContext context)
        {
            _context = context;
            _connection = new(_context.Database.GetConnectionString());
        }

        public async void AdicionarAsync(Tarefa tarefa)
        {
            await _context.Tarefas.AddAsync(tarefa);
        }

        public void AtualizarAsync(Tarefa tarefa)
        {
            _context.Tarefas.Update(tarefa);
        }

        public void ApagarAsync(Tarefa tarefa)
        {
            _context.Tarefas.Remove(tarefa);
        }

        public async Task<Tarefa> ObterPorIdAsync(int tarefaid)
        {
            var sql = "SELECT id, titulo, descricao, datavencimento, completa " +
                      "FROM tarefa " +
                      "WHERE id=@TarefaId " +
                      "ORDER BY id;";

            return await _connection.QueryFirstOrDefaultAsync<Tarefa>(sql, new
            {
                TarefaId = tarefaid
            });
        }

        public async Task<List<Tarefa>> ObterListaAsync(bool completa, bool incompleta, DateTime? dataincio, DateTime? datafim)
        {
            var sql = "SELECT id, titulo, descricao, datavencimento, completa " +
                      ObterFiltrosQuery(completa, incompleta, dataincio, datafim) + ';';

            var result = await _connection.QueryAsync<Tarefa>(sql, new
            {
                DataInicio = dataincio,
                DataFim = datafim

            });

            return result.ToList();
        }

        private string ObterFiltrosQuery(bool completa, bool incompleta, DateTime? datainicio, DateTime? datafim)
        {
            var sql = "FROM tarefa WHERE 1 = 1 ";

            if ((completa != false) && (incompleta != false))
            {
                sql += "AND completa in (1, 0)";
            }
            else if (completa != false)
            {
                sql += "AND completa = 1 ";
            }
            else if (incompleta != false)
            {
                sql += "AND completa = 0 ";
            }

            if ((datainicio != null) && (datafim != null))
                sql += "AND datavencimento BETWEEN @DataInicio and @DataFim";

            return string.Format(sql);
        }

        public void Dispose()
        {
            _context?.Dispose();
            _connection?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
