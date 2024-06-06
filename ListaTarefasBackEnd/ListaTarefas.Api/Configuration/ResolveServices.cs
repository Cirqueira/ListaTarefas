using ListaTarefas.Data.Repositories;
using ListaTarefas.Domain.Interfaces;
using ListaTarefas.Domain.Interfaces.Repository;
using ListaTarefas.Domain.Interfaces.Service;
using ListaTarefas.Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ListaTarefas.Api.Configuration
{
    public static class ResolveServices
    {
        public static IServiceCollection ResolveService(this IServiceCollection services)
        {
            //Services
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<ITarefaService, TarefaService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<ITarefaRepository, TarefaRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            return services;

        }
    }
}
