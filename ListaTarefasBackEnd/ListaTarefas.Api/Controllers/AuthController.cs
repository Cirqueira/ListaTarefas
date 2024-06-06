using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces;
using ListaTarefas.Domain.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ListaTarefas.Api.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : MainController
    {
        private readonly IUsuarioService _usuarioService;

        public AuthController(INotificationService notificationService, 
                              IUsuarioService usuarioService) : base(notificationService)
        {
            _usuarioService = usuarioService;
        }

        [AllowAnonymous]
        [HttpPost("Logar")]
        public async Task<IActionResult> Login([FromBody] Usuario usuario)
        {
            return CustomResponse(await _usuarioService.Logar(usuario));
        }
    }
}
