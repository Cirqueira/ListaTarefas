using System.Threading.Tasks;

namespace ListaTarefas.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        Task<bool> Commit();
    }
}
