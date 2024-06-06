using ListaTarefas.Domain.Entities;

namespace ListaTarefas.Domain.Interfaces.Service
{
    public interface IAuthService
    {
        string ObterAcessToken(Usuario usuario);
    }
}
