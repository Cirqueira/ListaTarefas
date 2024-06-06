using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using ListaTarefas.Domain.DomainObjects;
using ListaTarefas.Domain.DTOs;
using ListaTarefas.Domain.Entities;
using ListaTarefas.Domain.Interfaces;

namespace ListaTarefas.Domain.Services
{
    public class ServiceBase
    {
        public INotificationService _notificationService { get; set; }

        public ServiceBase(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        protected bool Validar<TV, TE>(TV tValidacao, TE tEntidade) where TV : AbstractValidator<TE> where TE : Entity
        {
            var validador = tValidacao.Validate(tEntidade);
            if (validador.IsValid)
                return true;

            Notify(validador);
            return false;
        }

        protected void Notify(string message)
        {
            _notificationService.Add(new NotificationMessage(message));
        }

        protected void Notify(ValidationResult validationResult)
        {
            validationResult.Errors.ToList().ForEach(vf => _notificationService.Add(vf));
        }

        protected void Notify(string propertyName, string message)
        {
            _notificationService.Add(new ValidationFailure(propertyName, message));
        }
    }
}
