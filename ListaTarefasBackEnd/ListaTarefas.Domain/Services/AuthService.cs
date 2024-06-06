using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces;
using ListaTarefas.Domain.Interfaces.Service;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using ListaTarefas.Domain.DomainObjects;
using Microsoft.Extensions.Options;

namespace ListaTarefas.Domain.Services
{
    public class AuthService : ServiceBase, IAuthService
    {
        private readonly IConfiguration _configuration;
        public AuthService(INotificationService notificationService, IConfiguration configuration) : base(notificationService)
        {
            _configuration = configuration;            
        }

        public string ObterAcessToken(Usuario usuario)
        {
            var identityClaims =  ObterClaimsUsuario(usuario);
            return CodificarToken(identityClaims);
        }

        private static ClaimsIdentity ObterClaimsUsuario(Usuario user)
        {
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(JwtRegisteredClaimNames.Email, user.Email),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()),
                new(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64)
            };
          
            return new ClaimsIdentity(claims);
        }

        private string CodificarToken(ClaimsIdentity identityClaims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();            
            var tokenConfigurations = new TokenConfigurations();
            new ConfigureFromConfigurationOptions<TokenConfigurations>(_configuration.GetSection("AppSettings")).Configure(tokenConfigurations);
            var key = Encoding.ASCII.GetBytes(tokenConfigurations.Secret);
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = tokenConfigurations.Issuer,
                Audience = tokenConfigurations.Audience,
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddSeconds(tokenConfigurations.Seconds),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            });

            return tokenHandler.WriteToken(token);
        }

        private static long ToUnixEpochDate(DateTime date)
           => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);

    }
}
