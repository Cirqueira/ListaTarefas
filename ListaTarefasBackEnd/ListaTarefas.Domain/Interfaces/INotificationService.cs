using FluentValidation.Results;
using ListaTarefas.Domain.DomainObjects;
using System.Collections.Generic;

namespace ListaTarefas.Domain.Interfaces
{
    public interface INotificationService
    {
        void Add(NotificationMessage notificationMessage);
        void AddRange(List<NotificationMessage> notificationsMessage);
        void Add(ValidationFailure validationFailure);
        List<NotificationMessage> GetMessages();
        List<ValidationFailure> GetValidationFailures();
        void Clear();
    }
}
