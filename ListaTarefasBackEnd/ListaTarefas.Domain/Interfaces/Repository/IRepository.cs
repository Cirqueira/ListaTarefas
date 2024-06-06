using System;
using ListaTarefas.Domain.Entities;

namespace ListaTarefas.Domain.Interfaces.Repository
{
    public interface IRepository<T> : IDisposable where T : Entity
    {
        IUnitOfWork UnitOfWork { get; }
        void AdicionarAsync(T entity);
        void AtualizarAsync(T entity);       
    }
}