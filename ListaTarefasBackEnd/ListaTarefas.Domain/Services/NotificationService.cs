using FluentValidation.Results;
using ListaTarefas.Domain.DomainObjects;
using ListaTarefas.Domain.Interfaces;
using System.Collections.Generic;

namespace ListaTarefas.Domain.Services
{
    public class NotificationService : INotificationService
    {
        private List<NotificationMessage> _notificationsMessage;
        private List<ValidationFailure> _notificationsValidationFailure;

        public NotificationService()
        {
            Clear();
        }

        public void Add(NotificationMessage notificationMessage) => _notificationsMessage.Add(notificationMessage);

        public void Add(ValidationFailure validationFailure) => _notificationsValidationFailure.Add(validationFailure);

        public void AddRange(List<NotificationMessage> notificationsMessage) => _notificationsMessage.AddRange(notificationsMessage);

        public List<NotificationMessage> GetMessages() => _notificationsMessage;

        public List<ValidationFailure> GetValidationFailures() => _notificationsValidationFailure;

        public void Clear()
        {
            _notificationsMessage = new List<NotificationMessage>();
            _notificationsValidationFailure = new List<ValidationFailure>();
        }
    }
}
