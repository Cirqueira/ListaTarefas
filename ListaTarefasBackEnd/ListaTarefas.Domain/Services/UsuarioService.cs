using ListaTarefas.Domain.DTOs;
using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces;
using ListaTarefas.Domain.Interfaces.Repository;
using ListaTarefas.Domain.Interfaces.Service;
using System;
using System.Threading.Tasks;

namespace ListaTarefas.Domain.Services
{
    public class UsuarioService : ServiceBase, IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IAuthService _authService;

        public UsuarioService(IUsuarioRepository usuarioRepository,
                              INotificationService notificationService,
                              IAuthService authService) : base(notificationService)
        {
            _usuarioRepository = usuarioRepository;
            _authService = authService;
        }

        public async Task<UsuarioLoginDTO> Logar(Usuario usuario)
        {
            if (string.IsNullOrEmpty(usuario.Email.Trim()) || 
                string.IsNullOrEmpty(usuario.Password.Trim()))
            {
                Notify("Usuario e/ou senha não podem ser vazios");
                return null;
            }

            var usuarioLogado = await  _usuarioRepository.ObterPorUsuarioESenhaAsync(
                usuario.Email, usuario.Password);

            if (usuarioLogado == null)
            {
                Notify("Usuario e/ou senha incorretos");
                return null;
            }

            // Generate Token
            var acessToken = _authService.ObterAcessToken(usuario);

            return new UsuarioLoginDTO()
            {
                Id = usuarioLogado.Id,
                Email = usuarioLogado.Email,
                AcessToken = acessToken,
            };
        }

        public void Dispose()
        {
            _usuarioRepository.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
