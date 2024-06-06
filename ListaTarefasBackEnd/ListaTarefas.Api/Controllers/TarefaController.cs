using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces;
using ListaTarefas.Domain.Interfaces.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ListaTarefas.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefaController : MainController
    {
        private readonly ITarefaService _tarefaService;

        public TarefaController(INotificationService notificationService,
            ITarefaService tarefaService) : base(notificationService)
        {
            _tarefaService = tarefaService;
        }
              
        [HttpPost("AdicionarAsync")]
        public async Task<IActionResult> AdicionarAsync(Tarefa tarefa)
        {
            return CustomResponse(await _tarefaService.AdicionarAsync(tarefa));
        }

        [HttpPut("AtualizarAsync")]
        public async Task<IActionResult> AtualizarAsync(Tarefa tarefa)
        {
            return CustomResponse(await _tarefaService.AtualizarAsync(tarefa));
        }        

        [HttpPut("ApagarAsync/{tarefaId}")]
        public async Task<IActionResult> ApagarAsync(int tarefaId)
        {
            return CustomResponse(await _tarefaService.ApagarAsync(tarefaId));
        }

        [HttpGet("ObterPorIdAsync/{tarefaId}")]
        public async Task<IActionResult> ObterPorIdAsync(int tarefaId)
        {
            return CustomResponse(await _tarefaService.ObterPorIdAsync(tarefaId));
        }
          
        [HttpGet("ObterListaAsync")]
        public async Task<IActionResult> ObterListaAsync(
            [FromQuery] bool completa, 
            [FromQuery] bool incompleta,
            [FromQuery] DateTime? datainicio,
            [FromQuery] DateTime? datafim)
        {
            return CustomResponse(await _tarefaService.ObterListaAsync(completa, incompleta, datainicio, datafim));
        }
    }
}