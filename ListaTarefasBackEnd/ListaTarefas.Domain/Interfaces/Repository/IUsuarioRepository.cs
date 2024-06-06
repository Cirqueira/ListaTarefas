using ListaTarefas.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace ListaTarefas.Domain.Interfaces.Repository
{
    public interface IUsuarioRepository : IDisposable
    {
        Task<Usuario> ObterPorUsuarioESenhaAsync(string email, string password);
    }
}
