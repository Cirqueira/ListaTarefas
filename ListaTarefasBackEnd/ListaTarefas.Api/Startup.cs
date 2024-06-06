using ListaTarefas.Api.Configuration;
using ListaTarefas.Data;
using ListaTarefas.Domain.DomainObjects;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Text;

namespace ListaTarefas.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var autorizationPolicy = new AuthorizationPolicyBuilder()
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .Build();

            var tokenConfigurations = new TokenConfigurations();
            new ConfigureFromConfigurationOptions<TokenConfigurations>(Configuration.GetSection("AppSettings")).Configure(tokenConfigurations);
            var key = Encoding.ASCII.GetBytes(tokenConfigurations.Secret);

            services.AddAuthentication(authOpt =>
            {
                authOpt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOpt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(bearerOpt =>
            {
                bearerOpt.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidAudience = tokenConfigurations.Audience,
                    ValidIssuer = tokenConfigurations.Issuer,

                    // Valida a assinatura de um token recebido
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = true,
                    ValidateIssuer = true,

                    // Verifica se um token recebido ainda é válido
                    ValidateLifetime = true,

                    // Tempo de tolerância para a expiração de um token (utilizado
                    // caso haja problemas de sincronismo de horário entre diferentes
                    // computadores envolvidos no processo de comunicação)
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddAuthorizationCore(options => options.AddPolicy("Bearer", autorizationPolicy));

            services.ResolveService();

            services.AddControllers(options => options.Filters.Add(new AuthorizeFilter(autorizationPolicy)));
            services.AddSwaggerConfiguration();

            services.AddCors(opt =>
            {
                opt.AddPolicy("MyPolicy", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                }
                );
            });

            services.AddHttpContextAccessor();
            services.AddScoped(op => 
            {
                var connection = Configuration.GetConnectionString("MyConnection");
                return new ListaTarefasContext(connection);
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ListaTarefasContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwaggerConfiguration();
            }

            app.UseCors("MyPolicy");
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            if (!context.Database.EnsureCreated() || context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }
        }
    }
}
