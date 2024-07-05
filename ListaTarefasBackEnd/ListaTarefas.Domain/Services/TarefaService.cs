using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces;
using ListaTarefas.Domain.Interfaces.Repository;
using ListaTarefas.Domain.Interfaces.Service;
using ListaTarefas.Domain.Notifications;
using ListaTarefas.Domain.Validation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ListaTarefas.Domain.Services
{
    public class TarefaService : ServiceBase, ITarefaService
    {
        private readonly ITarefaRepository _tarefaRepository;
        public TarefaService(ITarefaRepository tarefaRepository, INotificationService notification) : base(notification)
        {
            _tarefaRepository = tarefaRepository;
        }

        public async Task<Tarefa> ObterPorIdAsync(int tarefaId)
        {
            var tarefa = await _tarefaRepository.ObterPorIdAsync(tarefaId);
            if (tarefa == null)
            {
                Notify(TarefaNotifications.NaoEncontrado);
                return null;
            }

            return tarefa;
        }

        public async Task<List<Tarefa>> ObterListaAsync(bool completa, bool incompleta, DateTime? datainicio, DateTime? datafim)
        {
            var tarefa = await _tarefaRepository.ObterListaAsync(completa, incompleta, datainicio, datafim);
            if (tarefa == null)
            {
                Notify(TarefaNotifications.ListaVazia);
                return null;
            }

            return tarefa;
        }

        public async Task<Tarefa> AdicionarAsync(Tarefa tarefa)
        {
            if (!ValidarTarefaEntidade(tarefa, false))
            //if (!ValidarTarefaEntidade(tarefa, tarefa.DataVencimento.HasValue))
            {
                return null;
            }

            _tarefaRepository.AdicionarAsync(tarefa);

            if (!await _tarefaRepository.UnitOfWork.Commit())
            {
                Notify(TarefaNotifications.ErroAdicionar);
                return null;
            }

            return tarefa;
        }

        public async Task<Tarefa> AtualizarAsync(Tarefa tarefa)
        {

            if (!ValidarTarefaEntidade(tarefa, false))
            //if (!ValidarTarefaEntidade(tarefa, tarefa.DataVencimento.HasValue))
            {
                return null;
            }

            var tarefaBd = await _tarefaRepository.ObterPorIdAsync(tarefa.Id);

            if (tarefaBd == null)
            {
                Notify(TarefaNotifications.NaoEncontrado);
                return null;
            }

            tarefaBd.AtualizarTarefa(tarefa);
            _tarefaRepository.AtualizarAsync(tarefa);

            if (!await _tarefaRepository.UnitOfWork.Commit())
            {
                Notify(TarefaNotifications.ErroAtualizar);
                return null;
            }

            return tarefaBd;
        }

        public async Task<bool> ApagarAsync(int tarefaId)
        {
            var tarefaBd = await _tarefaRepository.ObterPorIdAsync(tarefaId);

            if (tarefaBd == null)
            {
                Notify(TarefaNotifications.NaoEncontrado);
                return false;
            }

            _tarefaRepository.ApagarAsync(tarefaBd);

            return await _tarefaRepository.UnitOfWork.Commit();
        }

        private bool ValidarTarefaEntidade(Tarefa tarefa, bool validardatavencimento = true)
        {
            return Validar(new TarefaValidation(validardatavencimento), tarefa);
        }

        public void Dispose()
        {
            _tarefaRepository.Dispose();
 
            GC.SuppressFinalize(this);
        }        
    }
}