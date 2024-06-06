using ListaTarefas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ListaTarefas.Domain.Interfaces.Repository
{
    public interface ITarefaRepository : IRepository<Tarefa>
    {
        Task<Tarefa> ObterPorIdAsync(int tarefaid);
        Task<List<Tarefa>> ObterListaAsync(bool completa, bool incompleta, DateTime? dataincio, DateTime? datafim);
        void ApagarAsync(Tarefa tarefa);        
    }
}