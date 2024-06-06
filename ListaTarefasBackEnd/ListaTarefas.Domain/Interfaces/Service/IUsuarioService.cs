using ListaTarefas.Domain.DTOs;
using ListaTarefas.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace ListaTarefas.Domain.Interfaces.Service
{
    public interface IUsuarioService : IDisposable
    {
        Task<UsuarioLoginDTO> Logar(Usuario usuario);
    }
}
