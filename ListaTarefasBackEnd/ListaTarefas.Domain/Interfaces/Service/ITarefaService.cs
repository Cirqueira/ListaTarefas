using ListaTarefas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ListaTarefas.Domain.Interfaces.Service
{
    public interface ITarefaService : IDisposable
    {
        Task<Tarefa> AdicionarAsync(Tarefa tarefa);
        Task<Tarefa> AtualizarAsync(Tarefa tarefa);       
        Task<bool> ApagarAsync(int tarefaId);
        Task<Tarefa> ObterPorIdAsync(int tarefaId);
        Task<List<Tarefa>> ObterListaAsync(bool completa, bool incompleta, DateTime? dataincio, DateTime? datafim);
    }
}